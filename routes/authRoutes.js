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

  //logout route handler
  app.get("/api/logout", (req, res) => {
    req.logout(); //it takes the cookie with its user id and kill this id
    res.send(req.user);
  });

  //authenticated user's data
  app.get("/api/current_user", (req, res) => {
    //res.send(req.session); //cookie data first setndit to req.session
    res.send(req.user); //passport automatically attaches this req property to user object
  });
};
