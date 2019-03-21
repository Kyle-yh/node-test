var express = require('express');
var router = express.Router();
var DB = require('../util/db.js')
var md5 = require('md5-node');

/* GET home page. */
router.post('/', (req, res, next)=> {
    console.log(req.body);    /*获取post提交的数据*/

    var username = req.body.username;
    var password=md5(req.body.password);
    var data = {
        username:username,
        password:password
    }
    DB.find('user',data,(err,data)=>{
        if(err){
            console.log(err)
            return;
        }
        console.log(data);
        if(data.length > 0){
            console.log('登录成功')
            req.session.userinfo = data[0];
            res.redirect('/product')
        }else{
            res.send("<script>alert('登录失败');location.href='/login'</script>");
        }
    })
    // MongoClient.connect(DbUrl,(err,db)=>{
    //     if(err){
    //         console.log(err)
    //         return;
    //     }
    //     var result=db.collection('user').find(data);
    //     console.log(result);
    //     result.toArray((err,data)=>{
    //         console.log(data);
    //         if(data.length > 0){
    //             console.log('登录成功')
    //             req.session.userinfo = data[0];
    //             res.redirect('/product')
    //         }else{
    //             res.send("<script>alert('登录失败');location.href='/login'</script>");
    //         }
    //         db.close();
    //     })
    // })
});


module.exports = router;
