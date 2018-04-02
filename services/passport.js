const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

//User is our model class which is the underlying collection
//to our mongodb. We can now make a model instance with this
//to make a record for each collection
const User = mongoose.model("users");
//user is the user model we just pulled out of the databse
passport.serializeUser((user, done) => {
  //user.id is the token returned by google that will be sent to server to set the cookie
  done(null, user.id);
});
//taking the cookie and turning it back into user model
passport.deserializeUser((id, done) => {
  //anytime we access a mongoDB database ,it is a asynchronous function
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record with this User ID
          done(null, existingUser);
          //null= no error here, we found the existing user
        } else {
          //make one discreet record. Model Instance of user
          //this is an asynchronous action
          new User({ googleID: profile.id }).save().then(user => {
            done(null, user);
          });
          //user is the new User that is being created
        }
      });
    }
  )
);
