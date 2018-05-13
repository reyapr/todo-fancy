const mongoose = require('mongoose')
const {Schema} = mongoose

const todoSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, 
        ref:'user'
    },
    task:{
        required:[true,'please input your task'],
        type:String
    },
    date:{
        required:[true,'please input your date task'],
        type:Date
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