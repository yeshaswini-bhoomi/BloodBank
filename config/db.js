//STEP: 5 FOR DATABASE CONNECTION
//1. import mongoose
const mongoose = require('mongoose')

//2. create a function
const connectDB = async() => {
    //use try catch block to handle success and error
    try {
        //call connect function
        await mongoose.connect(process.env.MONGO_URL)
        //when connected to mongodb db this message will be displayed in the console
        console.log(`Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta.white);
    }catch (error) {
        console.log(`Mongodb Database Error ${error}` .bgRed.white)
    }
}

//export
module.exports = connectDB