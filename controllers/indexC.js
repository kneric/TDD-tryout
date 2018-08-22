const User = require('../models/user');
const jwt = require ('jsonwebtoken');
const axios = require('axios');

const signin = (req, res) => {
  const {email, password} = req.body;

  User.findOne({email})
  .then (user => {
    if (user){
      user.checkPwd(password, (isMatched)=> {
        if(isMatched){
          let token = jwt.sign({
            _id: user._id, 
            name: user.name,
            email: user.email
          }, process.env.secretKey)
          res.status(200).json({
            token, 
            message:'Signed in succesfully'
          })
        } else {
          res.status(403).json({message:'email / password is incorrect'})
        }
      })
    } else {
      res.status(404).json({message: 'User not found'});
    }
  })
  .catch(err => {
    res.status(500).json({message: err.message});
  })
}

const signup = (req, res) => {
  const {name, email, password} = req.body;

  User.findOne({email})
  .then(user => {
    if(!user){
      return User.create({
        name,
        email,
        password
      })
      .then(createdUser=> {
        let token = jwt.sign({
          _id: createdUser._id,
          name: createdUser.name
        }, process.env.secretKey)
        res.status(201).json({
          token: token, 
          message: 'user created'
        })
      })
    } else {
      res.status(400).send('email already used')
    }
  })
  .catch(err=> {
    res.status(400).send(err.message);
  })
}

module.exports = {
  signin,
  signup
};