const express = require('express')
const app = express();
const session = require('express-session')
const { default: mongoose } = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer')
require('dotenv').config();


const storeRouter = require('./Routes/storeRouter')
const hostRouter = require('./Routes/hostRouter')
const authRouter = require('./Routes/authRouter')
const {notfound} = require('./controller/errorcontroller.js');

const path = require('path')
const root = require('./utils/root')



const url = process.env.MONGODB_URL;

const store = new MongoDBStore({
  uri: url,
  collection:'sessions'
})

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    

    if (file.fieldname === 'photo') {
      cb(null, 'uploads/')
    } else if (file.fieldname === 'rules') {
      cb(null, 'rules/')
    } else {
      return cb(new Error('Invalid fieldname'), null);
    }

    // Automatically create folder if it doesn’t exist
   
  },

  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const multeroptions = {
  storage, fileFilter
}

const upload = multer(multeroptions);

app.use(express.urlencoded())
app.use(upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'rules', maxCount: 1 }
]));
app.use(session({
  secret:process.env.SESSION_SECRET
  ,resave:false,
  saveUninitialized:true,
  store:store,
}))


app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(root,'public')))
app.use('/uploads',express.static(path.join(root,'uploads')))
app.use('/host/uploads',express.static(path.join(root,'uploads')))
app.use('/store/uploads',express.static(path.join(root,'uploads')))
app.use('/store/homelist/uploads',express.static(path.join(root,'uploads')))


app.use('/host',(req,res,next)=>{
  
  if(!req.session.IsLoggedIn ){
    return res.redirect('/login')
  }
  next();
})
app.use(storeRouter)
app.use(hostRouter)
app.use(authRouter)
app.use(notfound)

const PORT = process.env.PORT || 3000;


mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
   app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});