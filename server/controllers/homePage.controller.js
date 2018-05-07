const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports= {
    homePage(req,res,next){
        res.send('home')
    },
    signup(req,res,next){
        let {name,email,password,role} = req.body
        User.create({
            name,
            email,
            password,
            role
        })
        .then(success=>{
            res.status(200).json({
                message: 'created account success',
                name,
                email,
                role
            })
        })
        .catch(err=>{
            if(err.msg){
                return res.status(400).json({
                    err
                })  
            }
            let message = err.message.substr(34)
            if(message.substr(0,3)=='ion'){
                message = 'Email Already Registered'
            }
            res.status(400).json({
                message
            })  
            
        })
    },

    signin(req,res,next){
        let {email,password,role} = req.body
        let salt = bcrypt.genSaltSync()
        User.findOne({
            email
        }).then(user=>{
          return bcrypt.compare(password,user.password,function(err,match){
                if (match) {
                    let key = process.env.SECRET_KEY
                    let token = jwt.sign({
                        id:user._id,
                        email:user.email,
                        role:user.role
                    },key)
                    return res.status(200).json({
                        message:'success to login',
                        user,
                        token
                    })
                }
                res.json({ message: 'wrong password' })
           })
           
        }).catch(err=>{
            res.status(400).json({
                message:'user didn\'t found'
            })
        })
    },
}