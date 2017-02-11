var express       = require("express");
var app           = express();
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash         = require("connect-flash");

var Campground    = require("./models/campground");
var Comment       = require("./models/comment");
var User          = require("./models/user");

//requiring routes
var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes       = require("./routes/index");

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));


var seedDB = require("./seeds");

app.set("view engine", "ejs");

//connect to mongodb
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://june:june@ds019628.mlab.com:19628/node_app_one")

//tell app to use body parser
app.use(bodyParser.urlencoded({extended: true}));

//seedDB();

//passport configuration
//set up express session
app.use(require("express-session")({
    secret: "February 2nd, 2017",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground: ");
//             console.log(campground);
//         }
// });


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
});