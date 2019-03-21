var express = require('express');
var router = express.Router();
var DB = require('../util/db.js')

router.get('/',(req,res,next)=>{
  var id = req.query.id;

  DB.find('product',{"_id":new DB.ObjectID(id)},(err,data)=>{
    data[0].id = id;
    res.render('productedit',{
      list:data[0]
    })
  })
})

module.exports = router;
