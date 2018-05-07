const passport       = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User           =  require("../models/userModel");

passport.use(new GoogleStrategy({
  clientID: process.env.google_id,
  clientSecret: process.env.google_secret,
  callbackURL:"/google/success", 
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  console.log("Google profile...........");
  console.log(profile);

  const { id, displayName, emails } = profile;

  User.findOne({ googleID: id })

    .then((userDetails) => {
      if (userDetails){
        done(null, userDetails);
        return;
      }

      return User.create({ 
        googleID: id, 
        name: displayName,
        email: emails[0].value
      })
      .then((newUser)=>{
        done(null, newUser);
      })
    })
    .catch((err)=>{
      done(err);
    });
}));