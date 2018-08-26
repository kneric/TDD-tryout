const User = require('../models/user');
const jwt = require ('jsonwebtoken');

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
            name: user.name,
            message:'Signed in succesfully'
          })
        } else {
          res.status(403).json({message:'email / password is incorrect'})
        }
      })
    } else {
      res.status(404).json({message: 'User not registered'});
    }
  })
  .catch(err => {
    res.status(500).json(err);
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
      res.status(400).json({message: 'email already used'})
    }
  })
  .catch(err=> {
    res.status(400).json(err);
  })
}

module.exports = {
  signin,
  signup
};