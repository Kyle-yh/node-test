/**
 * Created by Administrator on 2017/8/18 0018.
 */
var MongoClient=require('mongodb').MongoClient;

var DbUrl='mongodb://localhost:27017/productmanage';  /*�������ݿ�*/
var ObjectID = require('mongodb').ObjectID;

function  __connectDb(callback){


    MongoClient.connect(DbUrl,function(err,db){

        if(err){

            console.log('数据库连接错误');
            return;
        }
        //���� �޸� ɾ��

          callback(db);


    })

}
exports.ObjectID=ObjectID;

//���ݿ����
/*
 Db.find('user',{},function(err,data){
    data����
})

 */
exports.find=function(collectionname,json,callback){

    __connectDb(function(db){


        var result=db.collection(collectionname).find(json);

        result.toArray(function(error,data){

            db.close();/*�ر����ݿ�����*/
            callback(error,data);/*�õ�����ִ�лص�����*/
        })

    })

}

//��������
exports.insert=function(collectionname,json,callback){

    __connectDb(function(db){


        db.collection(collectionname).insertOne(json,function(error,data){

            callback(error,data);
        })
    })

}


//��������
exports.update=function(collectionname,json1,json2,callback){

    __connectDb(function(db){
        db.collection(collectionname).updateOne(json1,{$set:json2},function(error,data){

            callback(error,data);
        })
    })

}

//ɾ������
exports.deleteOne=function(collectionname,json,callback){

    __connectDb(function(db){
        db.collection(collectionname).deleteOne(json,function(error,data){
            callback(error,data);
        })
    })

}