const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');

const session = require('express-session');

const mysql = require('mysql');
const dbConfig = require('./config/dbConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //body-parser

app.use(cors()); //  Cross Origin Resource Sharing  도메인 및 포트가 다른 서버로 클라이언트가 요청했을 때 브라우저가 보안상의 이유로 API를 차단
app.use('/api', api);
// app.use(cookieParse());

const dbOptions = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
};

const conn = mysql.createConnection(dbOptions);
conn.connect();


app.get('/login', function(req,res){
    // res.render('login');
    res.send('<p>ㅎㅇ</p>');
});

app.post('/login', function (req, res) {

    var id = req.body.id;
    var pwd = req.body.pwd;

    if (id && pwd) {
        conn.query('SELECT * FROM user WHERE id = ? AND pwd = ?', [id, pwd], function (error, results, fields) {
            if (error) throw error;
            else{
                if (results.length > 0) {
                    // req.session.loggedin = true;
                    // req.session.id = id;
                    res.send({
                        id : id,
                        isLoggedin: true
                    })
                    res.end();
                    console.log('성공');
                } else {
                    res.send({
                        isLoggedin: false,
                        failtype: 1
                    })
                    res.end();
                    console.log('실패시발아');
                }
            }
        });
    } 
    else {
        res.send({
            isLoggedin: false,
            failtype: 2
        })
        console.log('입력시발아');
        res.end();
    }
});

app.post('/assign_duplicate', function (req, res) {

    var id = req.body.id;
        console.log(id);
    if (id) {
        conn.query('SELECT * FROM user WHERE id = ?', [id], function (error, results, fields) {
            if (error) throw error;
            else {
                console.log(results.length);

                if (results.length > 0) {
                    // req.session.loggedin = true;
                    // req.session.id = id;
                    res.send({
                        id: id,
                        isduplicated: true
                    })
                } else {
                    res.send({
                        id: id,
                        isduplicated: false
                    })
                }
            }
        });
    }
});



const port = 3001;
app.listen(port, () => {
    console.log(`express is running on ${port}`);
})