let User = require('../models/user.model');

module.exports.create = (req, res) => {
  const user = req.body;

  if (user.email){

    const newUser = new User(user);
  
    newUser.save()
      .then(() => res.json({message: 'User Created!'}))
      .catch(err => res.status(400).json({error: err, message: "User cannot be created"}));
    
    
  } else {
    res.status(401).json({message: "invalid user params"});
  }
}

module.exports.addUser = (req, res) => {
  const user = {
    email: req.body.email,
    last_signed_in: new Date()
  };

  if (user.email){
    User.findOneAndUpdate({email: user.email}, user, { upsert: true, new: true })
      .then((user) => res.json({user: user, message: 'User Synced'}))
      .catch(err => res.status(400).json({error: err, message: 'User cannot be synced'}));
  } else {
    res.status(401).json({message: "invalid user params"});
  }
}