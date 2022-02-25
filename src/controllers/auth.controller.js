const express = require("express");
require("dotenv").config();

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
var newToken = (user)=>{
    return (jwt.sign({  user},process.env.JWT_SECRET_KEY));
}
const register = async (req,res) =>{
    try{
console.log(req.body.email)
        let user = await User.findOne({email:req.body.email}).lean().exec();
        if(user)
        return res.send("User already exists");
    //   console.log("kriti")
      const Token = newToken(user);
          user = await User.create(req.body);
// console.log(user)
         
          return res.render("login.ejs",{user});
        }
        //  return res.render();
        catch(err){
       return res.send(err.message);
    }
}
const signin =async (req,res) =>{
    try{
        // console.log(req.body);
        console.log(req.body.email)
        const user = await User.findOne({email:req.body.email});
        
        if(!user)
        {
            return res.send({message:"Either email or password is incorrect"});
        }
        const match = user.checkPassword(req.body.password);
        if(!match)
        {
            return res.send({message:"Either email or password is incorrect"});
        }
        const Token = newToken(user);
        res.render("homepage.ejs",{Token});
    }
    catch(err){
        res.send({msg:err.message});
    }
}
module.exports = {register,signin};
