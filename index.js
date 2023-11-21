const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./Routes/user');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/user' , userRoutes);
// mongodb+srv://junaidsalam639:<password>@cluster0.iip5ehd.mongodb.net/
mongoose.connect('mongodb+srv://junaidsalam639:user@cluster0.iip5ehd.mongodb.net/')
.then(()=>{
    console.log('mongoDB connect');
}).catch((err)=>{
    console.log(err);
})

app.get('/' , (req , res)=>{
    res.send('hello mongo');    
})

app.listen(8000 , ()=>{
    console.log('Node js');
})





