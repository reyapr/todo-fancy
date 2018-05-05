const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports= {
    homePage(req,res,next){
        res.send('home')
    },
    signup(req,res,next){
        let {name,email,password,role} = req.body
        let salt = bcrypt.genSaltSync()
        let includeNum = password.match(/\d+/g)

        if (password.length < 6 || !includeNum) {
            return res.status(400).json({
                message: 'password to weak, should more than 6 character, and include number'
            })
        }

        bcrypt.hash(password,salt,(err,hashPass)=>{
            if(err){
                console.log(err)
            }else{
                User.create({
                    name,
                    email,
                    password:hashPass,
                    role
                })
                .then(success=>{
                    res.status(200).json({
                        message: 'created account success',
                        name,
                        email,
                        password: hashPass
                    })
                })
                .catch(err=>{
                    let message = err.message.substr(30)
                    if(message.substr(0,7)=='lection'){
                        message = 'Email Already Registered'
                    }
                    res.status(400).json({
                        message
                    })
                })
            }
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