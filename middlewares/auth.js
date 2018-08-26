const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next)=> {
  if (!req.headers.token){
    res.status(403).json({message: 'not authorized'})
  } else {
    let loggedInUser = jwt.verify(req.headers.token, process.env.secretKey);
    req.user = loggedInUser

    User.findById(loggedInUser._id)
    .then(user => {
      if (!user){
        res.status(404).json({message: 'user is not registered'});
      } else {
        return next();
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = auth
