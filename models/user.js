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
  email: String,
  birthday: Date,
  usertype: {type: Number, default: 0}, //Mod Rights
  date: {type: Date, default:Date.now},
  attending:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conventions"
    }
  ],
  password: String,
  avatar: {
    type:String,
    default:"/assets/images/usr/placeholder-avatar.png"
  },
  bio: String,
  socialmedia:{
    twitter: String,
    instagram: String,
    facebook: String,
    tumblr: String,
    personal: String,
  },
},{usePushEach:true});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
