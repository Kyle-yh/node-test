var express = require('express');
var router = express.Router();
var DB = require('../util/db.js')

router.get('/',(req,res,next)=>{
    var kw = req.query.kw
    if(kw){
        var data = {title:new RegExp(kw)}
    }else{
        var data = {}
    }
    DB.find('product',data,(err,data)=>{
        if(!err){
            res.render('product',{
                list:data
            })
        }else{
            console.log(err)
        }
    });
})

module.exports = router;
