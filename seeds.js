var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
     name: "Cloud's Rest",
     image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
     description: "Lorem ipsum dolor sit amet, eu dicant lucilius duo, ad sensibus percipitur omittantur duo, ne vel latine mentitum disputationi. Nam eius illum velit ea, ius ad mutat affert fierent. Pro te veri equidem postulant, iusto tempor docendi ea per. No agam legere quaeque eum, ius dicam molestie definitionem cu, in nibh dolorum vel. Cu meis postea feugiat mea, ne usu facete iuvaret appetere. Vivendum recusabo elaboraret eam an, alii eruditi ex vim."
    },
    {
     name: "Granite Hill",
     image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique Lorem ipsum dolor sit amet, eu dicant lucilius duo, ad sensibus percipitur omittantur duo, ne vel latine mentitum disputationi. Nam eius illum velit ea, ius ad mutat affert fierent. Pro te veri equidem postulant, iusto tempor docendi ea per. No agam legere quaeque eum, ius dicam molestie definitionem cu, in nibh dolorum vel. Cu meis postea feugiat mea, ne usu facete iuvaret appetere. Vivendum recusabo elaboraret eam an, alii eruditi ex vim."
    },
    {
     name: "Salmon Creek",
     image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
     description:"Mauris ut nulla fringilla eros bibendum molestie. Lorem ipsum dolor sit amet, eu dicant lucilius duo, ad sensibus percipitur omittantur duo, ne vel latine mentitum disputationi. Nam eius illum velit ea, ius ad mutat affert fierent. Pro te veri equidem postulant, iusto tempor docendi ea per. No agam legere quaeque eum, ius dicam molestie definitionem cu, in nibh dolorum vel. Cu meis postea feugiat mea, ne usu facete iuvaret appetere. Vivendum recusabo elaboraret eam an, alii eruditi ex vim."
    }
    ]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds");
        }
        
        //add a few campgrounds
        //this needs to be in the callback for remove. if it's after the callback, there is no 
        //guarantee that this code would be run after the remove, it might be run before
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, data){
        //         if(err){
        //             console.log(err);
        //         }else {
        //             console.log("addded a campground");
        //             // add a comment to campground
        //             Comment.create({
        //                 text: "This place is great, but I wish there was internet.",
        //                 author: "Homer"
        //             }, function(err, createdComment){
        //                 if(err){
        //                     console.log(err);
        //                 }else {
                            
        //                     //associate the comment to the campground
        //                     data.comments.push(createdComment);
        //                     data.save();
        //                     console.log("created comment");
        //                 }
        //             })
                    
        //         }
            
        //     });
        // });
    });
    
    
};

module.exports = seedDB;

