const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

// Create Schema
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        password: {
            type: String,
            required:true
        },
        emailId:{
            type:String,
            required:true,
            unique:true
        },
        accountCredentials:{
            region:{
              type:String
            },
            accessKey:{
              type:String
            },
            secretKey:{
              type:String
            }
        }
    },
    {
        timestamps:true
    }
);

module.exports = User = mongoose.model("user", userSchema);