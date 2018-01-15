var mongoose = require("mongoose");
var Conventions = require("./models/cons");
var Comment = require("./models/comment");
var data =[
  {name:"Katsucon" ,
  location:"National Harbor, MD" ,
  image:"http://www.nerdwatch.com/wp-content/uploads/2015/02/katsucon-2015-014.jpg",
  description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
  {name:"AnimeUSA" ,
  location:"Washington, DC" ,
  image:"http://4.bp.blogspot.com/-yAmeet74uGY/TskV9Ye_XoI/AAAAAAAAGhw/5rtdkbqwXVA/s1600/101_2804.JPG",
  description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
  {name:"Otakon" ,
  location:"Washington, DC" ,
  image:"http://www.trbimg.com/img-57ac9dcc/turbine/bs-ed-otakon-conventions-20160811",
  description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},

];
function seedDB(){
  Conventions.remove({}, function(err){
    // if(err){
    //     console.log("Error");
    // }
    // console.log("Removed conventions");
    // data.forEach(function(seed){
    //   Conventions.create(seed, function(err, convention){
    //     if(err){
    //       console.log(err);
    //     } else {
    //       console.log("Constructed initial data.");
    //       Comment.create(
    //         {
    //           text: "This place is great!",
    //           author:"Adam"
    //         }, function(err,comment){
    //             if(err){
    //               console.log(err);
    //             } else {
    //               convention.comments.push(comment);
    //               convention.save();
    //               console.log("comment added");
    //           }
    //         });
    //     }
    //   });
    // });
  });


}


module.exports = seedDB;
