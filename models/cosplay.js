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
    pics: [{
      path: String,
      favorite: Boolean,
    }],

    cons: [{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Conventions"
    }],
    desc: String,

  }, {usePushEach:true});
module.exports = mongoose.model("Cosplays", CosplaySchema);
