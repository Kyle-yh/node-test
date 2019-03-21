var express = require('express');
var router = express.Router();
var DB = require('../util/db.js')
var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/

/* GET home page. */
router.post('/', (req, res, next)=> {
    
    //获取表单的数据 以及post过来的图片

    var form = new multiparty.Form();

    form.uploadDir='upload'   //上传图片保存的地址     目录必须存在

    form.parse(req, (err, fields, files)=> {
        if(err){
            console.log(err)
            return;
        }
        //获取提交的数据以及图片上传成功返回的图片信息
        //
        //console.log(fields);  /*获取表单的数据*/
        //
        //console.log(files);  /*图片上传成功返回的信息*/
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];
        var pic=files.pic[0].path;
        //console.log(pic);

        DB.insert('product',{
            title:title,
            price:price,
            fee,
            description,
            pic

        },function(err,data){
            if(!err){
                res.redirect('/product'); /*上传成功跳转到首页*/
            }

        })




    });


});


module.exports = router;
