const User = require("../Models/userModel");
const { handleErrors } = require("../Functions/handleError");
const createToken = require('../Functions/createToken');
const bcrypt = require('bcrypt');
const { isEmail } = require("validator");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (user) {
      throw Error("Email already in exits");
    }
    const createUser =await User.create({ name, email, password });
    const token = createToken(createUser);
    res.status(200).json({name : createUser.name , id : createUser._id , token });
    console.log('registration successfull', createUser);
  } catch (err) {
    console.log(err);
    const errorMessage = handleErrors(err);
    res.status(400).json({ err : errorMessage });
  }
};

const loginUser =async(req,res)=>{
  try{
    const {email, password} = req.body;
    if(!email)throw Error('Enter an email');
    if(!password)throw Error('Enter a password');
    if(!isEmail(email)) throw Error('Email is not valid');
    const user = await User.findOne({ email });
    if(user){
      const auth = await bcrypt.compare(password,user.password);
      if(auth){
        const token = createToken(user);
        res.status(200).json({name : user.name , id : user._id , token });
      }
      else{
        throw Error ('Incorrect Password');
      }
    }
    else{
      throw Error("Email not found");
    }
  }
  catch(err){
    console.log(err);
    const errorMessage = handleErrors(err);
    res.status(400).json({ err : errorMessage});
  }
}

const findUser = async(req,res)=>{
  try{
    const userID = req.params.userID;
    const user = await User.findById(userID);
    res.status(200).json(user);
  }
  catch(err){
    console.log(err);
    res.status(400).json({ err });
  }
}

const getAllUsers = async(req,res)=>{
  try{
    const users = await User.find();
    res.status(200).json(users)
  }
  catch(err){
    console.log(err);
    res.status(400).json({err});
  }
}

module.exports = { registerUser, loginUser , findUser, getAllUsers };
