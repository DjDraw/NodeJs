const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const CookieSession = require("cookie-session");

require("./model/sequelize/passport")(passport);

//settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//middlewares
app.use(cookie());
app.use(bodyParser.urlencoded({extended: false}));
app.use(CookieSession({
    name: "sesion",
    keys: ["llave-1", "llave-2"]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require("./routes/user")(app,passport);
require("./routes/actions")(app);

//static files
app.use(express.static(path.join(__dirname,"library")));

app.listen(3000, () => {
    console.log("Server Up!");
});