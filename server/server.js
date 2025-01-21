const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect("mongodb+srv://dhruvsahu7355:dhruvsh%4097@cluster0.3j9vr.mongodb.net/").then(()=>
    console.log("Connected to the database")).catch((err)=>
        console.log(err))

const app = express();

const port = process.env.PORT|| 5000;

app.use(
    cors({
        origin : 'http://localhost:5173/',
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders :[
            "content-type",
            "Authorization",
            "cache-control",
            "Expires",
            "pragma",
        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());    

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})