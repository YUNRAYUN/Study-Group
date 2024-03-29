const express = require('express')
const path = require('path')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const commentsRouter = require('./routes/comment');
const app = express()

app.set('port', process.env.PORT || 3002);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);


app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
  
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

mongoose.set('debug', true)


mongoose.connect("mongodb://localhost:27017/admin", {
    dbName: 'nodejs'
}).then(() => {
    console.log("데이터베이스 연결에 성공하였습니다.")
})
  
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});