const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

// Create Schema
const stackSchema = new mongoose.Schema(
    {
      userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
      },
      name:{
          type:String
      },
      launchTemplate:{
        type:mongoose.Types.ObjectId,
        ref:"cftTemplate",
      },
      status:{
        type:String
      }
    },
    {
        timestamps:true
    }
);

module.exports = stack = mongoose.model("stack", stackSchema);