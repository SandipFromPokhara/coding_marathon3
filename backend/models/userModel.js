const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    address: {
        street: { type: String, required: true }, 
        city: { type: String, required: true}, 
        zipCode: { type: String, required: true }
    }
},
{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);