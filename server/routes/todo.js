const express = require('express')
const router = express.Router()

const {
    addTask,
    showTask,
    editTask,
    updateStatus,
    deleteTask
}=require('../controllers/todo.controller')
const{
    authentication,
    authorization
}=require('../middleware/auth')

router.post('/',authentication,authorization,addTask)
router.get('/',authentication,authorization,showTask)
router.put('/:id',authentication,authorization,editTask)
router.put('/status/:id',authentication,authorization,updateStatus)
router.delete('/:id',authentication,authorization,deleteTask)

module.exports = router