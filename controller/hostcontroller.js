const { log } = require("console");
const Favid = require("../models/favidmodel");
const Home = require("../models/model");
const fs = require('fs')
const path = require('path')

exports.addHome = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("host/edit.ejs", { val: "addhome", editing: false,IsLoggedIn:req.session.IsLoggedIn ,user:req.session.user  });
};

exports.postHome = (req, res) => {
  console.log(req.files)
  const { name, location, price, rating, description } = req.body;

   const photo = req.files['photo'] ? req.files['photo'][0].path : null;
   const rules = req.files['rules'] ? req.files['rules'][0].path : null;
  const home = new Home({ name, location, price,  rating, photo, rules,description });
  console.log(home);
  if (!req.files){
    console.log(req.files)
    return res.status(404).send('image not found')
  }
  

  home
    .save()
    .then((response) => {
      console.log("Home added successfully", response);
    })
    .catch((err) => {
      console.error("Error adding home:", err);
    });
  res.status(200).redirect("/host/home-list");
};

exports.hosthomelist = (req, res, next) => {
  console.log(req.url, req.method);
  Home.find().then((data) => {
    console.log("Fetched homes:", data);
    res.render("host/host-home-list.ejs", {
      card: data,
      val: "host-home-list",
      IsLoggedIn: req.session.IsLoggedIn,
      user:req.session.user
    });
  });
};
exports.editHome = (req, res) => {
  console.log("editHome called");
  const id = req.params.id;
  const editing = req.query.editing === "true"; // Convert 'true' or 'false' string to boolean
  console.log(id, editing);
  Home.findById(id).then((data) => {
    console.log("Home found:", data);
    res.render("host/edit.ejs", {
      home: data,
      val: "edit-home",
      editing: editing,
      IsLoggedIn: req.session.IsLoggedIn,
      user:req.session.user
    });
  });
};

exports.postEditedHome = (req, res) => {
  console.log(req.files)
  const { id, name, location, price, rating,description } = req.body;
  console.log("postEditedHome called with ID:", id);
  Home.findById(id)
    .then((home) => {
      home.name = name;
      home.location = location;
      home.price = price;
      home.rating = rating;
      home.description = description;
      if(req.files['photo']){
        const filePath = path.join(__dirname,'..', home.photo);
        console.log('filepath is',filePath)
        fs.unlink(filePath,(err)=>{
          if(err){
            console.log('error while deleting file',err)
          }
          else{
            console.log('unlinked')
          }
        })
        home.photo = req.files['photo'][0].path
      }
      if(req.files['rules']){
        const filePath = path.join(__dirname,'..', home.rules);
        console.log('filepath is',filePath)
        fs.unlink(filePath,(err)=>{
          if(err){
            console.log('error while deleting file',err)
          }
          else{
            console.log('unlinked')
          }
        })
        home.rules = req.files['rules'][0].path
      }
      home.save()
        .then((response) => {
          console.log("Home updated successfully", response);
        })
        .catch((err) => {
          console.error("Error updating home:", err);
          return res.status(500).send("Error updating home");
        });
      console.log("Home updated successfully with ID:", id);
      res.status(200).redirect("/host/home-list");
    })
    .catch((err) => {
      console.error("Error finding home with ID:", id, err);
      return res.status(500).send("Error finding home");
    });
};

exports.deleteHome = (req, res) => {
  const id = req.params.id;
  console.log('params',req.params,'body',req.body,'url',req.url)
  Home.findByIdAndDelete(id)
    .then(() => {
      if(req.body.rules){
        const filePath = path.join(__dirname,'..', req.body.rules);
         fs.unlink(filePath,(err)=>err?console.log(err):"rules deleted")
      }
      if(req.body.photo){
        const filePath = path.join(__dirname,'..', req.body.photo);
         fs.unlink(filePath,(err)=>err?console.log(err):"photo deleted")
      }
      console.log("Home deleted successfully with ID:", id);
      res.status(200).redirect("/host/home-list");
    })
    .catch((err) => {
      console.error("Error deleting home with ID:", id, err);
      return res.status(500).send("Error deleting home");
    });
};
