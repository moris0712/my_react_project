const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');

const mysql = require('mysql');
const dbConfig = require('./config/dbConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //body-parser

app.use(cors()); //  Cross Origin Resource Sharing  도메인 및 포트가 다른 서버로 클라이언트가 요청했을 때 브라우저가 보안상의 이유로 API를 차단
app.use('/api', api);

const dbOptions = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
};

const conn = mysql.createConnection(dbOptions);
conn.connect();

// app.get('/', function (req, res) {
//     res.send('<p>adsads</p>');
// });

app.get('/login', function(req,res){
    res.render('login');
});

app.post('/login', function (req, res) {
    var id = req.body.id;
    var pw = req.body.pwd;
    console.log(id+" "+pw);
    var sql = 'SELECT * FROM User WHERE id=?';
    conn.query(sql, [id], function (err, results) {
        if (err)
            console.log(err);

        if (!results[0])
            return res.send('please check your id.');

        var user = results[0];
        crypto.pbkdf2(pw, user.salt, 100000, 64, 'sha512', function (err, derivedKey) {
            if (err)
                console.log(err);
            if (derivedKey.toString('hex') === user.password) {
                return res.send('login success');
            }
            else {
                return res.send('please check your password.');
            }
        });//pbkdf2
    });//query
}
);



const port = 3001;
app.listen(port, () => {
    console.log(`express is running on ${port}`);
})