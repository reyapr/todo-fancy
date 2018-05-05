const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: {
        type:String,
        required:[true,'You Should Input Your Name']
    },
    email: {
        type:String,
        required: [true, 'You Should Input Your Email'],
        unique: [true, 'Email Already Registered'],
        validate:{
            isAsync:true,
            validator:(email,callback)=>{
                let emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
                callback(emailValidate.test(email),'Email Doesn\'t Meet Criteria' )
            }
        }
    },
    password: {
        type: String,
        required: [true, 'You Should Input Your Password'],
    },
    role:{
        type: String,
        required: [true, 'You Should Input Your Role'],
    }
},{
    timestamps:true
})

let user = mongoose.model('user',userSchema)

module.exports = user