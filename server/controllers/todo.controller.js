const Todo = require('../models/todo.model') 
const mongoose= require('mongoose')

module.exports={
    addTask(req,res,next){
        const user = req.headers.decoded.id
        const {task,date} = req.body
        Todo.create({
            user,
            task,
            date
        }).then(task=>{
            res.status(200).json({
                message: 'success to add task',
                task
            })
        }).catch(err=>{
            res.status(400).json({
                message:err.message.substr(30)
            })
        })
    },

    showTask(req,res,next){
        const id = req.headers.decoded.id
        Todo.find().populate('user','_id').
        then(tasks=>{
            let allTask = tasks.filter(allTask=>{
                if(allTask.user._id==id){
                    return allTask
                }
            })
            res.status(200).json({
                allTask
            })
        }).catch(err=>{
            res.status(400).json({
                message:'can\'t find a tasks'
            })
        })
    },

    editTask(req,res,next){
        const _id = mongoose.Types.ObjectId(req.params.id)
        const {task,date,status} = req.body

        Todo.update({
            _id,
        },{
            task,
            date,
            status
        }).then(updated=>{
            res.status(200).json({
                message:'task success to update',
                updated
            })
        }).catch(err=>{
            res.status(400).json({
                message:err.message
            })
        })
    },

    deleteTask(req,res,next){
        const _id = mongoose.Types.ObjectId(req.params.id)

        Todo.remove({
            _id,
        }).then(deleted=>{
            res.status(200).json({
                message:'task success to delete',
            })
        }).catch(err=>{
            res.status(400).json({
                message:err.message
            })
        })
    }
}