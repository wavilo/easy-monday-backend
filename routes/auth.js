//j'ai commencé des changements mais peut etre il faudra tout copier coller

const passport = require('passport');
const express  = require('express');
const bcrypt   = require('bcrypt'); 
const User     = require('../models/userModel'); 
const router   = express.Router();
const bcryptSalt = 10;



//Signup route ////////////////////////////////////////////////////////

router.post("/signup", (req, res, next) => {
const { name, email, password } = req.body;

    if(password === "" || password.match(/[0-9]/) === null ){
        // res.redirect("/signup");
        const err = new Error("Username or password invalid");
        err.status = 400;
        next(err);
        return;
    }

    User.findOne({ email }, "email", (err, user) => {
        if(user !== null) {
            const err = new Error("Email already exist");
            err.status = 400;
            next(err);
            return;
        }
    });


    const salt = bcrypt.genSaltSync(bcryptSalt); 
    const encryptedPassword = bcrypt.hashSync(password, salt)

    const newUser = new User({
      name: name,  
      encryptedPassword: encryptedPassword,
      email: email
    });
  
    newUser.save((err) => {
        if (err) {
            next(err);
        } else {
            req.login(newUser, () => {
                newUser.encryptedPassword = undefined;
                res.json({ userInfo: newUser });
            });
        }
    });
    
});
  

//login Route //////////////////////////////////////////////////////////

router.post("/login", (req, res, next) => {
const {email, password} = req.body;

    User.findOne({ email })
    .then((userDetails)=>{
        if (!userDetails){
            const err = new Error("Log in failed");
            err.status = 400;
            next(err);
            return;
        }

        const { encryptedPassword } = userDetails;
        if(!bcrypt.compareSync(password, encryptedPassword)) {
            const err = new Error("Log in failed");
            err.status = 400;
            next(err);
            return;
        }

        req.login(userDetails, () =>{
            userDetails.encryptedPassword = undefined;
            res.json({ userInfo: userDetails });
        });
    })
    .catch((err) => {
    next(err);
    });
});
  
  
//logout route /////////////////////////////////////////////////////////

router.get("/logout", (req, res, next) => {
    req.logout();
    res.json({ userInfo: null });
});


//check login route ////////////////////////////////////////////////////

router.get("/checklogin", (req, res, next) => {
    if(req.user) {
        req.user.encryptedPassword = undefined;
    }
    res.json({ userInfo: req.user });
});



//google route
// router.get("/google/login",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/plus.login",
//       "https://www.googleapis.com/auth/plus.profile.emails.read"
//     ]
//   }));

// router.get("/google/success", 
//   passport.authenticate("google", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   }));


  

module.exports = router;