var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//index
router.get("/", function(req, res){
    
    
    //second argument is an object representing the data we are pass to the ejs page
    //we are passing data campgrounds under the name campgrounds
    //so we are passing an object and the data is in an array
    //{campgrounds: campgrounds} = {name we are giving the data: data we are passing in}
    //res.render("campgrounds", {campgrounds:campgrounds});
    
    //get all campgrounds from the db
    Campground.find({}, function(err, campgrounds){
        if(err) {
            console.log("error");
        } else {
            res.render("campgrounds/index", {campgrounds:campgrounds, currentUser: req.user});
            console.log(req.user);
        }
    });
})

//new route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    
    //res.send("you hit the post route");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    var author = {
      id: req.user._id,
      username:req.user.username
    };
    
    var newCampground = {name: name, image: image, description: desc, author: author};
    //campgrounds.push(newCampground);
    
    //Create a new campground and save to the database
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");
            console.log(newlyCreated);
        }
    });
    
    //redirect back to campgrounds page
    //res.redirect("/campgrounds");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    
    //find the campground with the provided id and then render
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
    
});

//Edit 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});

//Update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
            console.log(err);
        } else {
            //redirect
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
});

//delete
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;