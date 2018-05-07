const passport = require('passport');
const express  = require('express');
const bcrypt   = require('bcrypt'); 
const User     = require('../models/userModel'); 
const router   = express.Router();

// signup route

router.get("/signup", (req, res, next) => {
  res.render('auth/signup');
});

router.post("/process-signup", (req, res, next) => {
  const { name, email, password} = req.body;

  if(password === "" || password.match(/[0-9]/) === null ){
    res.redirect("/signup");
    return;
  }

  const salt = bcrypt.genSaltSync(10); 
  const encryptedPassword = bcrypt.hashSync(password, salt)

  User.create({name, email, encryptedPassword})
    .then(()=>{
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

//login route
router.get("/login", (req, res, next) =>{
  res.render("auth/login");
});

router.post("/process-login", (req, res, next) => {
  const {email, password} = req.body;

  User.findOne({ email })
    .then((userDetails)=>{
      if (!userDetails){
        res.redirect("/login");
        return;
      }
      
      const { encryptedPassword } = userDetails;
      if(!bcrypt.compareSync(password, encryptedPassword)) {
        res.redirect("/login");
        return
      }
      req.login(userDetails, () =>{
        res.redirect("/");
      });
    })
    .catch((err) => {
      next(err);
    });

});


router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});


//google route
router.get("/google/login",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.profile.emails.read"
    ]
  }));

router.get("/google/success", 
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  }));


  

module.exports = router;