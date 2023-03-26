const express = require ('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const User = require('./models/User.js')
const bcrypt = require('bcryptjs');
const e = require('express');

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000',
}));

await mongoose.connect('process.env.MONGO_URL')

app.get ('/test', (req,res) => {
    res.json('test ok');
});

app.post('/signup', async (req,res) => {
    const{name,surname,email,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            surname,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userDoc);

    } catch (e) {
        res.status(422).json(e);
    }
    

   
});

app.post('/api/login', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });

app.listen(4000);