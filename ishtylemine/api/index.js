const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Stylist = require('./models/Stylist'); 
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'wdaadadadefsfsfwesefegsgs';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'https://project02-front.vercel.app/',
}));

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

function getStylistDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, stylistData) => {
      if (err) throw err;
      resolve(stylistData);
    });
  });
}

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/signup', async(req,res) => {
  const {name,surname,email,password} = req.body;

  try{
    const userDoc = await User.create({
      name,
      surname,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  }catch(e) {
    res.status(422).json(e);
  }

});

app.post('/login', async (req, res) => {
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email, 
        id:userDoc._id, 
        name:userDoc.name}, 
        jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('password wrong');
    }
  } else {
    res.json('not found');
  }
});

app.post('/stylistlogin', async (req, res) => {
  const {email, password} = req.body;
  const stylistDoc = await Stylist.findOne({email});
  if (stylistDoc) {
    const passOk = bcrypt.compareSync(password, stylistDoc.password);
    if (passOk) {
      jwt.sign({
        email: stylistDoc.email, 
        id: stylistDoc._id, 
        name: stylistDoc.name
      }, 
      jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(stylistDoc);
      });
    } else {
      res.status(422).json('password wrong');
    }
  } else {
    res.json('not found');
  }
});

app.post('/stylistsignup', async(req,res) => {
  const {name,surname,email,password} = req.body;

  try{
    const stylistDoc = await Stylist.create({
      name,
      surname,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(stylistDoc);
  }catch(e) {
    res.status(422).json(e);
  }
});


app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) =>{
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);

      res.json({name,email,_id});
    })
  } else{
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);

});

app.get('/stylistprofile', (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, stylistData) =>{
      if (err) throw err;
      const {name,email,_id} = await Stylist.findById(stylistData.id);

      res.json({name,email,_id});
    })
  } else{
    res.json(null);
  }
});



app.listen(3000);