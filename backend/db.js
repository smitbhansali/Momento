const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/project3?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

//connects to mogodb

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo");
    })
}

module.exports = connectToMongo;