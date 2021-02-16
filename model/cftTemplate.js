const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

// Create Schema
const cftTemplateSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        isGithubReq:{
            type:Boolean
        },
        isCustomizable: {
            type:Boolean
        },
        customizeOption:{
            type:String,
        },
        template:{
            type:String
        }
    },
    {
        timestamps:true
    }
);

module.exports = cftTemplate = mongoose.model("cftTemplate", cftTemplateSchema);