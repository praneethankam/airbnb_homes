const session = require('express-session');
const { check , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../models/user.js');


exports.getsignup = (req, res) => {
    res.render('auth/signup.ejs', { val: "signup" , IsLoggedIn: false,
        errors: [],
        oldinput: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword:'',
            userType: '',
            user:{}
        }
    });
    
}

exports.postsignup = [
    check('firstname')
    .notEmpty().withMessage('First name is required')
    .trim().isLength(2).withMessage('First name must be at least 2 characters long')
    .matches(/^[a-zA-Z]+$/).withMessage('First name must contain only letters'),

    check('lastname')
    .notEmpty().withMessage('Last name is required')
    .trim().isLength(2).withMessage('Last name must be at least 2 characters long')
    .matches(/^[a-zA-Z]*$/).withMessage('Last name must contain only letters'),

    check('email')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

    check('password')
    .notEmpty().withMessage('Password is required')
    .trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character'),

    check('confirmpassword')
    .notEmpty().withMessage('Confirm password is required').trim()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),

    check('userType')
    .notEmpty().withMessage('User type is required')
    .isIn(['host', 'guest']).withMessage('User type must be either host or guest')
    .trim(),

    check('terms')
    .notEmpty().withMessage('You must accept the terms and conditions')
    .custom((value) => {
        if (value !== 'on') {
            throw new Error('You must accept the terms and conditions');
        }
        return true;
    }),

    (req, res,next) => {
        console.log(req.body);
        const { firstname, lastname, email, password , confirmpassword, userType} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).render('auth/signup.ejs', {
                val: "signup",
                IsLoggedIn: false,
                errors: errors.array().map(err => ({
                    msg: err.msg})),
                oldinput: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    confirmpassword: confirmpassword, // Include confirm password in old input
                    userType: userType,
                    user:{}
                }    
            });
        }
    bcrypt.hash(password,12).then((hashedpassword)=>{
        const user = new User({firstname, lastname, email, password:hashedpassword, userType});
         user.save()
        .then(() => {
            console.log("User created successfully");
            res.redirect('/login')
        }) 
         .catch(err => {
            let formattedErrors = [];

                    // Handle MongoDB duplicate key error (E11000)
                    if (err.code === 11000 && err.keyPattern?.email) {
                        formattedErrors.push({ msg: "Email already exists. Please use a different email." });
                    } else {
                        formattedErrors.push({ msg: "An unexpected error occurred. Please try again." });
                    }
            console.error("Error creating user:", err);
                return res.status(422).render('auth/signup.ejs', {
                    val: "signup",
                    IsLoggedIn: false,
                    errors: formattedErrors,
                    oldinput: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password,
                        confirmpassword:confirmpassword,
                        userType: userType,
                        user:{}
                    }
                });   
        })
    })
        
    
   
        
         
}]
exports.getlogin = (req, res) => {
    res.render('auth/login.ejs', { val: "login" , IsLoggedIn: false,error:'',oldinput:{email:'',password:''},user:{}});
}

exports.postlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('details', user);

    if (!user) {
      return res.render('auth/login.ejs', {
        val: "login",
        IsLoggedIn: false,
        error: 'email not found',
        oldinput: { email: email },
        user:{}
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render('auth/login.ejs', {
        val: "login",
        IsLoggedIn: false,
        error: 'password does not match',
        user:{}
      });
    }

    req.session.IsLoggedIn = true;
    req.session.user = user;
    console.log('user session',req.session.user)
    res.redirect('/');
    
  } catch (err) {
    console.log("error while checking email", err);
    res.status(500).send("Internal Server Error");
  }
};



exports.postlogout = (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/login');
    }) // Clear session variable
    
}