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