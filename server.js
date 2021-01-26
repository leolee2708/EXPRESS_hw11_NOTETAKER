const express = require("express");
const fs = require("fs");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
var app = express();
var PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( express.static("./public"));

app.use("/",apiRoutes);
app.use("/",htmlRoutes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});