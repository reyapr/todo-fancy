const express = require('express');
const router = express.Router();

const{
  homePage,
  signup,
  signin,
}= require('../controllers/homePage.controller')

const{
  authentication,
  authorization
}=require('../middleware/auth')

/* GET users listing. */
router.get('/', homePage)
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signin', authentication,authorization)

module.exports = router;
