var express = require('express');
var router = express.Router();
var DB = require('../util/db.js')
var md5 = require('md5-node');
/* GET home page. */
router.post('/', (req, res, next)=> {
    console.log(req.body)
    var username = req.body.username;
    var password=md5(req.body.password);
    var data = {
        username:username,
        password:password
    }

    DB.insert('user',data,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('注册成功')
        res.redirect('/login')
    })
});


module.exports = router;
