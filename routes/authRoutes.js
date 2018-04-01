const passport = require("passport");

module.exports = app => {
  //route-handler for /auth/google
  app.get(
    "/auth/google",
    //using GoogleStartegy with the identfier 'google'
    passport.authenticate("google", {
      //asking google for users profile and email
      scope: ["profile", "email"]
    })
  );

  //route-handler when user visits /auth/google/callback after
  //it gives the permission to google to use its information

  app.get("/auth/google/callback", passport.authenticate("google"));
};
