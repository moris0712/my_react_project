const express = require('express');
const app = express();

const cors = require('cors');

const bcrypt = require('bcrypt');

const mysql = require('mysql');
const dbConfig = require('./config/dbConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //body-parser

let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}  // axios에서 쿠키를 교환할 때 withCredentials를 true로 바꿔줘야한다 (Header.js)  이거없으면 세션 안됨


app.use(cors(corsOptions)); //  Cross Origin Resource Sharing  도메인 및 포트가 다른 서버로 클라이언트가 요청했을 때 브라우저가 보안상의 이유로 API를 차단


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


const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);


var sessionStore = new MySQLStore(dbOptions,conn);

app.use(session({
    httpOnly: true, //자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    key: 'Top key',
    secret: 'Top secret',        //암호화하는 데 쓰일 키
    resave: false,            //세션을 언제나 저장할지 설정함
    saveUninitialized: true, //세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    store: sessionStore,
    // cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    //     Secure: true
    // }
}))

const api = require('./routes/index');
app.use('/api', api);




app.post('/login', function (req, res) {

    var id = req.body.id;
    var pwd = req.body.pwd;



    if (id && pwd) {

        conn.query('SELECT * FROM user WHERE id = ?', [id], function (error, results, fields) {
            
            if (error) throw error;
            else{
                if (results.length > 0) {
                    // bcrypt.compareSync(입력한 비밀번호, 데베에 있는 해시된 비밀번호) 동기
                    bcrypt.compare(pwd, results[0].pwd, function (err, compare_result) { // 비동기, 입력한 비밀번호와 데베에 저장된 해쉬된 비밀번호 같은지 확인
                        if (err) throw err;
                        else{
                            if(compare_result){
                                req.session.user={
                                    idx: results[0].idx,
                                    pwd: results[0].pwd,
                                    id: results[0].id,
                                    name: results[0].name
                                };

                               req.session.save( err => {
                                    if(err){
                                        console.log('여기에러?');
                                    }    
                                    else{
                                        res.send({
                                            isLoggedin: true
                                        })
                                    }
                                });
                                // console.log(req.session.user);
                                console.log(req.session.user.name+" 로그인");
                            }
                            else{
                                res.send({
                                    isLoggedin: false,
                                    message: '비밀번호가 일치하지 않습니다.'
                                })
                                res.end();
                            }
                        }
                    });
                } else {
                    res.send({
                        isLoggedin: false,
                        message: '존재하지 않는 아이디 입니다.'
                    })
                    res.end();
                }
            }
        });
    } 
    else {
        res.send({
            isLoggedin: false,
            message: '아이디와 비밀번호를 입력해주세요.'
        })
        res.end();
    }
});


app.get('/', (req, res) => {
    if (req.session.user){
        res.send({
            isLoggedin: true,
            name: req.session.user.name
        });
    }
    else{
        res.send({
            isLoggedin: false
        });
    }
})



app.get('/logout', function (req, res) {
   
    if(req.session.user){
        console.log('ㅂㅂ2');
        req.session.destroy(
            function (err) {
                if (err) {
                    console.log('세션 삭제 에러');
                    return;
                }
                else{
                    console.log('세션 삭제 성공');
                    res.send({
                        isLogout: true
                    })
                }
            }
        );  
    } else {
        console.log('로그인 안되어 있음');
    }

});

app.post('/profile', function (req, res) {

    var id = req.body.id;

    if (id) {
        conn.query('SELECT id, name FROM user WHERE id = ?', [id], function (error, results, fields) {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    res.send({
                        name: results[0].name,
                        id: results[0].id
                    })
                }
                else{
                    console.log('error');
                }
            }
        });
    }
});

app.post('/assign_duplicate', function (req, res) {

    var id = req.body.id;
       
    if (id) {
        conn.query('SELECT id FROM user WHERE id = ?', [id], function (error, results, fields) {
            if (error) throw error;
            else {
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

app.post('/assign', function (req, res) {

    var name = req.body.name;
    var id = req.body.id;
    var pwd = req.body.pwd;

    
    if (name && id && pwd) {

        // var hash_pwd = bcrypt.hashSync(pwd, 10);  // 동기 saltOrRounds 2^10번 돌림, 클 수록 암호화 강력하지만 속도 느려짐
  
        bcrypt.hash(pwd, 10, function (error, hash_pwd) { // 비동기
            if (error) throw error;
            else{
                conn.query('INSERT INTO user (name, id, pwd, no_encrypted_pwd) values(?,?,?,?)', [name, id, hash_pwd, pwd], function (error, results, fields) {
                    if (error) throw error;
                    else {
                        res.send({
                            assign: true
                        })
                    }
                });
            }
        });
    }
});


app.get('/board', function (req, res) {
    // 게시판 전체리스트
    var sql = 'SELECT rownum, idx, title, content, writer, ins_date, upd_date,hit '
    sql += 'FROM ( SELECT @rownum:=@rownum+1 AS rownum '
    sql += ', idx, title, content, (SELECT id FROM User WHERE writer_idx = idx) as writer, ins_date, upd_date, hit, isdelete '
    sql += 'FROM Board B , '
    sql += '( SELECT @rownum := 0 ) R Where isdelete=0 '
    sql += 'ORDER BY upd_date ASC ) SUB '
    sql += 'ORDER BY SUB.rownum DESC;'
    // 대충 게시판 목록 불러와서 행번호 역순으로 메기는 질의문
    conn.query( sql , function(error,results,fields){
        if (error) throw error;
        else {
            res.send(results);
        }
    })

});



app.post('/board_comment', function (req, res) {
    // 게시판 상세보기
    var idx = req.body.idx;

    var sql ='SELECT idx, comment, parent_idx, '
    sql += '(SELECT name FROM User WHERE idx = writer_idx) as writer, '
    sql += 'ins_date, upd_date, '
    sql += '(SELECT COUNT(*) FROM Board_recommend WHERE board_idx=? and comment_idx =idx) AS recommend ' // 댓글 추천수
    sql += '(SELECT EXISTS(SELECT * FROM Board_recommend WHERE comment_idx=idx and user_idx=1)) as isrecommend ' // 내가 댓글 추천했는지
    sql += 'FROM Board_comment WHERE board_idx=? and isdelete=0 ' //user_idx 수정할것
    sql += 'ORDER BY upd_date DESC '
    conn.query(sql, [idx,idx], function (error, results, fields) {
        if (error) throw error;
        else {
            console.log(results);
            res.send(results);
        }
    });
});



app.post('/view_count', function (req, res) {
    // 조회수
    var idx = req.body.idx;

    conn.query('UPDATE Board SET hit = hit+1 WHERE idx = ?', [idx], function (error, results, fields) {
        if (error) throw error;
        else {
            res.send(results);
        }
    });
});



app.post('/submit_comment', function (req, res) {
    // 댓글등록
    var text = req.body.text;
    var user_idx = req.body.user_idx;
    var board_idx = req.body.board_idx;

    conn.query('INSERT INTO Board_comment(board_idx, comment, writer_idx) values(?, ?, ?)', [board_idx, text, user_idx], function (error, results, fields) {
        if (error) throw error;
        else {
            res.send(results);
        }
    });
});


const port = 3001;
app.listen(port, () => {
    console.log(`express is running on ${port}`);
})