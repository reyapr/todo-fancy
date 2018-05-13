const express = require('express');
const router = express.Router();

const{
  homePage,
  signup,
  signin,
  fbLogin
}= require('../controllers/homePage.controller')


/* GET users listing. */
router.get('/', homePage)
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/fblogin', fbLogin)

module.exports = router;
