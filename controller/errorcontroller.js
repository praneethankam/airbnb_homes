exports.notfound = (req,res,next)=>{
    res.status(404).render('404.ejs', { val: "notfound",isLoggedIn:req.session.isLoggedIn,user:req.session.user});
}
