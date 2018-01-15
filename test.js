var mongoose= require("mongoose");
mongoose.connect("mongodb://localhost/test_db");

var testSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperment: String
});

var Cat = mongoose.model("Cat", testSchema);

// var george = new Cat({
//   name: "George",
//   age: 11,
//   temperment: "Grouchy"
// });
// george.save(function(err, cat){
//   if(err){
//     console.log("SOMETHING IS BORK");
//   } else {
//     console.log("Saved to DB!");
//     console.log(cat);
//   }
// });
Cat.find({}, function(err, cats){
  if(err){
    console.log("YA FUCKED");
    console.log(err);
  } else {
    console.log(cats);
  }
})
