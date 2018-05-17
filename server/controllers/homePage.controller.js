const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const FB = require('fb')

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
            let message = err.message.substr(31)
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
    fbLogin(req,res,next){
        FB.setAccessToken(req.headers.fbtoken)
        FB.api('/me',{
            fields:['name','email','picture']
        }).then(response=>{
            const {name,email,picture} = response
            User.findOne({email})
            .then(getUser=>{
                let key = process.env.SECRET_KEY
                let image = picture.data.url
                if(getUser){
                    let role = getUser.role
                    let token = jwt.sign({
                        id:getUser._id,
                        name,
                        email,
                        role:'user'
                    },key)
                    
                    res.status(200).json({
                        message:'success login with facebook',
                        token,
                        role,
                        image,
                        name
                    })
                }else{
                    User.create({
                        name,
                        email,
                        password:'hacktiv8student',
                        role:'user'
                    }).then(createdUser=>{
                        let role = createdUser.role
                        let key = process.env.SECRET_KEY
                        let token = jwt.sign({
                            id: createdUser._id,
                            name,
                            email,
                            role: createdUser.role
                        }, key)
                        res.status(200).json({
                            message:'success login with facebook',
                            token,
                            role,
                            image,
                            name
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(response)
        })
    }
}