var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
  global.name = 'test'
  res.render('login')
})

module.exports = router;
