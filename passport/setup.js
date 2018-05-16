const passport = require("passport");
const User = require("../models/userModel");




passport.serializeUser((userDetails, done)=>{
  console.log('serialize (save to session)');
  done(null, userDetails._id); 
});

passport.deserializeUser((idFromSession, done)=>{
  // console.log({idFromSession})
  console.log('deserialize (details from session)');
  User.findById(idFromSession) 
    .then((userDetails)=>{ 
      // console.log({userDetails})
      done(null, userDetails); 
    })
    .catch((err)=>{
      done(err);
    });
});


function passportSetup(app){ 
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.blahUser = req.user; 
    next();
  });
}

module.exports = passportSetup;