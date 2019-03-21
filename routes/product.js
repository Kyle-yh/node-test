var express = require('express');
var router = express.Router();
var DB = require('../util/db.js')

router.get('/',(req,res,next)=>{
  DB.find('product',{},(err,data)=>{
    if(err){
      console.log(err);
      return;
    }
    res.render('product',{
      list:data
    })
  })
})

module.exports = router;
