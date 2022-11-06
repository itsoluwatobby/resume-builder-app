const Resume = require('../model/Resume')
const User = require('../model/User')
const asyncHandler = require('express-async-handler');

exports.createResume = asyncHandler(async(req, res) => {
  const resumeInput = req.body
  const {email} = req.query
  const user = await User.findOne({email}).exec();
  if(!user) return res.status(401).json('you do not have an account');
  
  const existingingResume = await Resume.findOne({userId: user._id})
  if(existingingResume){
    await existingingResume.deleteOne()
  }

  const resumeWithUserId = {...resumeInput, userId: user._id}

  const resume = await Resume.create(resumeWithUserId);
  res.status(201).json(resume)
})

exports.updateResume = asyncHandler(async(req, res) => {
  const resume = req.body
  const user = await User.findOne({email: resume.email}).exec();
  if(!user) return res.status(403).json('you need to create an account first');
  const userResume = await Resume.findOne({email: user.email}).exec();
  if(!userResume) return res.status(400).json('resume not found');

  const updatedResume = await Resume.findByIdAndUpdate(userResume._id, {$set: resume})
  res.status(201).json(updatedResume)
})

exports.deleteResume = asyncHandler(async(req, res) => {
  const resume = req.body
  const user = await User.findOne({email: resume.email}).exec();
  if(!user) return res.status(403).json('you need to create an account first');
  const userResume = await Resume.findOne({email: user.email}).exec();
  if(!userResume) return res.status(400).json('resume not found');

  await userResume.deleteOne().
  res.sendStatus(204)
})

exports.getResume = asyncHandler(async(req, res) => {
  const {email} = req.query
  const user = await User.findOne({email}).exec();
  if(!user) return res.status(403).json('you need to create an account first');
  
  const userResume = await Resume.findOne({userId: user._id}).exec();
  if(!userResume) return res.status(400).json('resume not found');

  res.status(200).json(userResume)
})