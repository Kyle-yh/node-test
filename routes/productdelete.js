var express = require('express');
var router = express.Router();
var DB = require('../util/db.js')

router.get('/',(req,res,next)=>{
  var id = req.query.id;
  DB.deleteOne('product',{"_id":new DB.ObjectID(id)},(err)=>{
    if(!err){
      res.redirect('product');
    }
  })
})

module.exports = router;
