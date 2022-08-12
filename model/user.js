import mongoose from "mongoose";

// Users collection
const userSchema = mongoose.Schema({
    name:String,
    email: String,
    username: String,
    password: String,
});

export default mongoose.model('Users', userSchema);