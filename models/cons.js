var mongoose = require("mongoose");
//SCHEMA SETUP
var conventionSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  attending: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  date: {type: Date, default: Date.now}
},{usePushEach:true});
module.exports = mongoose.model("Conventions", conventionSchema);
