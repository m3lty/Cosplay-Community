var mongoose= require("mongoose")
  var CosplaySchema = new mongoose.Schema({
    author: {
      id: {
      type:mongoose.Schema.Types.ObjectId
    },
     username: String,
    },
    character: String,
    series: String,
    image: String,
    uploaded: Date,
    defaultPicture: String,
    pics: [{
      path: String,
      author: mongoose.Schema.Types.ObjectId
    }],

    cons: [{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Conventions"
    }],
    likedBy: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],
    desc: String,

  }, {usePushEach:true});
module.exports = mongoose.model("Cosplays", CosplaySchema);
