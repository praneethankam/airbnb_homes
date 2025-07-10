const Home = require('../models/model');
const Favid = require('../models/favidmodel');
const User = require('../models/user')
const { ObjectId } = require('mongodb');
const path = require('path')
const root = path.join(__dirname,'..','rules')


exports.homelist = (req,res,next)=>{
    console.log(req.url,req.method)
     Home.find().then((data)=>{
        console.log(data);
        console.log(req.session.IsLoggedIn)
        res.render('store/home-list.ejs',{card:data,val:'home-list', IsLoggedIn: req.session.IsLoggedIn,user:req.session.user });   
    }); 
}

exports.bookings = (req, res) =>{
   res.render('store/bookings.ejs', { val: "bookings" , IsLoggedIn: req.session.IsLoggedIn ,user:req.session.user});  
}

exports.addtofavlist = async (req, res) =>{
    const userid = req.session.user._id;
    const  {houseId}  = req.body;
    const user = await User.findById(userid);
    if(!user.Favourites.includes(houseId)){
        user.Favourites.push(houseId)
        await user.save()
    }
    return res.redirect('/store/favlist');
    
}

exports.favlist = async (req, res) =>{
  const userid = req.session.user._id;
  const data = await User.findById(userid).populate('Favourites')
  console.log('fav data',data)
  res.render('store/fav-list.ejs',{card:data.Favourites,val:'favlist', IsLoggedIn: req.session.IsLoggedIn ,user:req.session.user});  
  console.log('after populating',data)

 
}

exports.removefromfavlist =async (req, res) =>{
    const userid = req.session.user._id;
    console.log(req.body)
    const  {houseId}  = req.body;
    console.log('houseid',houseId)
    const user = await User.findById(userid);
    console.log('user',user)
    if (user.Favourites.includes(houseId)){
        user.Favourites = user.Favourites.filter(fav=>fav != houseId)
        await user.save()
    }
    res.redirect('/store/favlist');

    
}

exports.airbnb = (req, res) =>{
     Home.find().then((data)=>{
        console.log(data);
        res.render('store/airbnb.ejs',{card:data,val:'airbnb home', IsLoggedIn: req.session.IsLoggedIn,user:req.session.user });
     })
   
}

exports.homedetail = (req, res) =>{
    console.log(req.params.homeid);
    Home.findById(req.params.homeid).then((data)=>{
        console.log(data);
        res.render('store/home-details.ejs',{card:data,val:'home-list',val2:req.params.homeid, IsLoggedIn: req.session.IsLoggedIn,user:req.session.user  });
    })
}

exports.houserules = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(root, filename);
  console.log(filePath)
    
  res.download(filePath, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).send("File not found");
    }
  });
  
};
