const express = require("express");
require("./services/passport");
//const authRoutes = require("./routes/authRoutes");
//const passportConfig = require('./services/passport');
//because we are not exporting passport.js and here we are not saving
//to some other const we can simple require it like so

const app = express();
//authRoutes(app);
//requiring authRoutes returns a function and we call it with passing our app object immediately
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// app.get("/", (req, res) => {
//   res.send({ hi: "there" });
// });

// https://accounts.google.com/o/oauth2/v2/auth?
// response_type=code&
// redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&
// scope=profile%20
// email&
// client_id=352151147870-eii8gs3ljoo8fjs6se27uukh60a1eupm.apps.googleusercontent.com
