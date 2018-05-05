const mongoose = require('mongoose')
const {Schema} = mongoose

const todoSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId, 
        ref:'user'
    },
    task:{
        required:[true,'please input your task'],
        type:String
    },
    status:{
        enum: [true, false],
        default:false,
        type:Boolean
    }
},{
    timestamps: true
})

const todo = mongoose.model('todo',todoSchema)

module.exports = todo