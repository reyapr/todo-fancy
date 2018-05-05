const Todo = require('../models/todo.model') 
const mongoose= require('mongoose')

module.exports={
    addTask(req,res,next){
        const user_id = req.headers.decoded.id
        const {task} = req.body
        Todo.create({
            user_id,
            task,
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
        const user_id = req.headers.decoded.id
        Todo.find({
            user_id 
        }).then(tasks=>{
            if(tasks){
                return res.status(200).json({
                    tasks
                })
            }
        }).catch(err=>{
            res.status(400).json({
                message:'can\'t find a tasks'
            })
        })
    },

    editTask(req,res,next){
        const _id = mongoose.Types.ObjectId(req.params.id)
        const {task} = req.body

        Todo.update({
            _id,
        },{
            task
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

    updateStatus(req,res,next){
        const _id = mongoose.Types.ObjectId(req.params.id)
        const {status} = req.body

        Todo.update({
            _id,
        },{
            status
        }).then(updated=>{
            res.status(200).json({
                message:'status success to update',
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