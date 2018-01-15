var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    required: true,
    lowercase: true,
    unique: true
  },
  password: String,
  avatar: String
},{usePushEach:true});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
