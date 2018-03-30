const express = require("express");
const app = express();

//route-handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.port || 5000;
app.listen(PORT); //express tells node to listen to port 5000
