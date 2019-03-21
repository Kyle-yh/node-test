var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//保存用户信息
var session = require("express-session");

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var productRouter = require('./routes/product');
var productaddRouter = require('./routes/productadd');
var producteditRouter = require('./routes/productedit');
var productdeleteRouter = require('./routes/productdelete');
var doLoginRouter = require('./routes/doLogin');
var loginOutRouter = require('./routes/loginOut')
var doProductAddRouter = require('./routes/doProductAdd')
var doProductEditRouter = require('./routes/doProductEdit')
var doProductSearchRouter = require('./routes/doProductSearch')
var registerRouter = require('./routes/register')
var doRegisterRouter = require('./routes/doRegister')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/upload',express.static('upload'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge:1000*60*30
  },
  rolling:true
}))

app.use((req,res,next)=>{
  if(req.url == '/login' || req.url == '/doLogin' || req.url == '/register' || req.url == '/doRegister'){
    next();
  }else{
    if(req.session && req.session.userinfo && req.session.userinfo.username != ''){
        console.log('用户信息')
        console.log(req.session.userinfo)
        app.locals['userinfo'] = req.session.userinfo;
        next();
    }else{
      res.redirect('/login')
    }
  }
})

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/product', productRouter);
app.use('/productadd', productaddRouter);
app.use('/productedit', producteditRouter);
app.use('/productdelete', productdeleteRouter);
app.use('/doLogin',doLoginRouter);
app.use('/loginOut',loginOutRouter);
app.use('/doProductAdd',doProductAddRouter);
app.use('/doProductEdit',doProductEditRouter)
app.use('/doProductSearch',doProductSearchRouter)
app.use('/register',registerRouter);
app.use('/doRegister',doRegisterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
