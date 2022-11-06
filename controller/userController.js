const bcrypt = require('bcrypt');
const User = require('../model/User')
const jwt = require('jsonwebtoken');

const handleRegister = async (req, res) => {
   const { username, email, password } = req.body
   if(!username || !email || !password) return res.status(400).json({ status: false, message: 'All fields required'})

    try{
      const duplicateEmail = await User.findOne({email}).exec()
      if(duplicateEmail) return res.status(409).json({status: false, message: 'email taken'}) 

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await new User({
         username, email, password: hashedPassword
      });
      console.log('here4')
      await user.save() 
      res.status(201).json({status: true})
    }
    catch(error){
      res.sendStatus(500)
    }
}

const handleLogin = async (req, res) => {
   const { email, password } = req.body
   if(!email || !password) {
      return res.status(400).json({ status: false, message: 'All fields required'})
   }
   try{
      const user = await User.findOne({email}).exec()
         if(!user) {
            return res.status(403).json({status: false, message: 'bad credentials'})
         }

      const match = await bcrypt.compare(password, user.password);
      if(!match) {
         return res.status(403).json({status: false, message: 'bad credentials'})
      }
      
      res.status(200).json({email})
   }
   catch(error){
      res.sendStatus(500)
   }
}

const handleLogout = async (req, res) => {
  const cookies = req.cookies
  if(!cookies?.jwt) return res.sendStatus(204)
  res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
  res.sendStatus(204)
}

module.exports = { handleRegister, handleLogin, handleLogout }