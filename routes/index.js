var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


//root route
router.get("/", function(req, res){
    //res.send("This will be the landing page soon ... ");
    res.render("landing");
})


//==========================
//authorization routes
//==========================

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            //return res.redirect("/register");
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You have been successfully registered as " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

//logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are now logged out!");
    res.redirect("/campgrounds");
});


module.exports = router;