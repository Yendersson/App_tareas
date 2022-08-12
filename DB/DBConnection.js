import mongoose from "mongoose";
import STR_CNX from "./config.js";

const conection = async ()=>{
    try {
        console.log('connecting to database...');
        mongoose.connect(STR_CNX, {useNewUrlParser: true}, {useUnifiedTopology: true});
        console.log('database conected successfully');
    } catch (error) {
        console.log('Error to connect with database');
    }
}

export default conection;