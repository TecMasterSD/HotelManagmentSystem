    const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true },
        useremail: { type: String, required: true },
        userpassword: { type: String, required: true },
        userrole: { 
            type: String, 
            enum: ["admin","manager", "reception", "housekeeping", "user"], 
            default: "user" 
        },  
        selectedRole : {
        type : String ,
        },
        otp: { type: Number },
        otpexpiretime: { type: String },
        isvrify: { type: String, default: "pending" }
    }, { timestamps: true });

    module.exports = mongoose.model("User", UserSchema);
