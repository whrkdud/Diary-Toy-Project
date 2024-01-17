const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { send } = require('process');
const port = 5000
const connection = mysql.createConnection({
    host : '127.0.0.1',
    port : '3306',
    user : 'root',
    password : '1234',
    database : 'diary'
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/login',(req,res) => {
    let id = req.body.id;
    let password = req.body.password;
    let sendData = {confirm:""}
    connection.connect();
    connection.query(`SELECT * FROM login WHERE ID='${id}' AND password='${password}'`,(err,result)=>{
        if (err) throw err;
        if (result.length > 0) {
            res.send(result)
        }else {
            res.send(sendData.confirm="로그인실패")
        }
    })
})

app.post('/registercheck',(req,res) =>{
    let id = req.body.id;
    let sendData = {check:""}
    connection.connect();
    connection.query(`SELECT * FROM login WHERE ID='${id}'`,(err,result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(sendData.check="impossible")
        }else {
            res.send(sendData.check="possible")
        }
    })
})

app.post('/register',(req,res) => {
    let id = req.body.id;
    let password = req.body.password
    let name = req.body.name
    let nickname = req.body.nickname
    let phonenum = req.body.phonenum
    let sendData = {result:""}
    if(!((id==="")||(password==="")||(name==="")||(nickname==="")||(phonenum==="")||(sendData===""))){
        connection.connect();
        connection.query(`INSERT INTO login (ID,NickName,password,name,phonenum) VALUES('${id}','${nickname}','${password}','${name}','${phonenum}')`,(err,result) =>{
        if (err){
            res.send(sendData.result="fail")
        }else {
            res.send(sendData.result="success")
        }
        })
    }else{
        res.send(sendData.result="again")
    }
})

app.post('/findId',(req,res) => {
    let name = req.body.name
    let phonenum = req.body.phonenum
    connection.connect();
    connection.query(`SELECT ID FROM login WHERE name='${name}' AND phonenum='${phonenum}'`,(err,result)=>{
        if(err) throw err
        if(result.length > 0){
            res.send(result)
        }else {
            res.send("정보없음")
        }
    })
})

app.post('/findPw',(req,res) => {
    let id = req.body.id
    let name = req.body.name
    let phonenum = req.body.phonenum
    connection.connect();
    connection.query(`SELECT password FROM login WHERE id='${id}' AND name='${name}' AND phonenum='${phonenum}'`,(err,result)=>{
        if(err) throw err
        if(result.length > 0){
            res.send(result)
        }else{
            res.send("정보없음")
        }
    })
})

app.post('/updatePW',(req,res) => {
    let id = req.body.id
    let password = req.body.newpassword
    connection.connect();
    connection.query(`UPDATE login SET password='${password}' WHERE ID='${id}'`)
})

app.post('/saveYearlyPlan',(req,res) => {
    let id = req.body.id
    let year = req.body.year
    let content = req.body.content
    connection.connect();
    connection.query(`INSERT INTO yearly_plan (ID,year,content) VALUES('${id}',${year},'${content}')`)
})

app.post('/showYearlyPlan',(req,res) => {
    let id = req.body.id
    connection.connect();
    connection.query(`SELECT seq,content,year FROM yearly_plan WHERE ID='${id}' ORDER BY seq DESC`,(err,result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.delete('/deleteYearlyPlan',(req,res) => {
    let id = req.body.id
    let seq = req.body.seq
    connection.connect();
    connection.query(`DELETE FROM yearly_plan WHERE ID='${id}' AND seq=${seq}`,(err,result)=>{
        if (err) throw err
    })
})

app.put('/updateYearlyPlan',(req,res) => {
    let id = req.body.id
    let seq = req.body.seq
    let content = req.body.content
    connection.connect();
    connection.query(`UPDATE yearly_plan SET content='${content}' WHERE seq=${seq} AND ID='${id}'`)
})

app.post('/addSchedule',(req,res)=>{
    let id = req.body.id
    let date = req.body.date
    let sort = req.body.sort
    let title = req.body.title
    let color = req.body.color
    connection.connect();
    connection.query(`INSERT INTO monthly_plan(ID,date,sort,title,color) VALUES('${id}','${date}','${sort}','${title}','${color}')`)
})

app.post('/home', (req,res)=>{
    let id = req.body.id
    connection.connect();
    connection.query(`SELECT seq,color,title,date FROM monthly_plan WHERE ID='${id}'`,(err,result) => {
        if(err) throw err
        res.send(result)
    })
})

app.post('/readyearlyplan' , (req,res) => {
    let id = req.body.id
    connection.connect();
    connection.query(`SELECT seq,content FROM yearly_plan WHERE ID='${id}' ORDER BY seq DESC LIMIT 5`,(err,result) => {
        if (err) throw err
        res.send(result)
    })
})

app.post('/deleteEvent', (req,res) => {
    let id = req.body.id
    let seq = req.body.seq
    connection.connect();
    connection.query(`DELETE FROM monthly_plan WHERE ID='${id}' AND seq=${seq}`,(err,result)=>{
        if (err) throw err
        res.send("삭제되었습니다")
    })
})

app.listen(port,()=>{
    console.log(`Server is running... on http://localhost:${port}`)
})