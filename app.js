var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override");
//model declarations
var Conventions = require("./models/cons"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    Cosplay = require("./models/cosplay"),
    seedDB = require("./seeds");
//route declarations
var commentRoutes = require("./routes/comments"),
    conRoutes = require("./routes/cons"),
    indexRoutes = require("./routes/index"),
    cosplayRoutes = require("./routes/cosplay"),
    userRoutes = require("./routes/users");
//seedDB();
//PASSPORT CONFIG
app.use(express.static('public'));
app.use(require("express-session")({
  secret:"Oppai Oppai Oppai",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
mongoose.connect("mongodb://localhost/conventions");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(methodOverride("_method"));
//prefacing route names
app.use("/", indexRoutes);
app.use("/cons/:id/comments", commentRoutes);
app.use("/cons", conRoutes);
app.use("/users", userRoutes);
app.use("/cosplay", cosplayRoutes);

//listening on local port 3000
app.listen(3000, function(){
  console.log("Con Server is listening at 3000");
});
