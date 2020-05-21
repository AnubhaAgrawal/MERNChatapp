const express = require('express');
const app= express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
//const MONODB_URI = 'mongodb://localhost:27017/mernauth';
const MONODB_URI = 'mongodb+srv://Anubha:agrawal@cluster0-cwp44.mongodb.net/test?retryWrites=true&w=majority'
//mongoose connection
mongoose.connect(MONODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is Connected !!')
});

/*const User = require('./models/User');

const userInput = {
    username: "Anubha",
    email: "anu@gmail.com",
    password: '1234567',
    role: 'admin'
}

const user = new User(userInput);
user.save((err,document) =>{
    if(err)
       console.log(err);
    console.log(document);   
});*/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  });
app.use('/users', require('./routes/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));