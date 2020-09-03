var express = require('express');
var api = express.Router();
const pool = require('../config/database')


api.get('/select', async (req, res, next) => {
    try {
        let where = (req.query.idx) ? 'where idx = '+req.query.idx : '';
        let data = await pool.query(`select idx,name,title,content from node_table `+where+` order by idx desc`);
        
        return res.json(data[0]);
    } catch (err) {
        return res.status(500).json(err)
    }
});

api.post('/select/confirm', async (req, res, next) => {
    try {
        console.log(req.body.idx, req.body.password)
        let data = await pool.query(`select idx,name,title,content from node_table where idx = ? and password =?`,[req.body.idx, req.body.password]);
       console.log(data[0][0])
        if(data[0][0]){
            return res.send(data[0][0]);
        }else{
            return res.send('empty');    
        }
    } catch (err) {
        return res.status(500).json(err)
    }
});

api.post('/insert', async (req, res, next) => {
    try {
        const data = await pool.query('INSERT INTO node_table (name, title, content, password) VALUES (?,?,?,?)',[req.body.name,req.body.title,req.body.content,req.body.password])
        return res.send('글 작성 성공')
    } catch (err) {
        return res.status(500).json(err)
    }
});

api.put('/put', async (req, res, next) => {
    try {
        const data = await pool.query('UPDATE node_table SET name = ? , title = ?, content = ? WHERE idx = ?',[req.body.name, req.body.title, req.body.content, req.body.idx])

        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
});

api.delete('/delete', async (req, res, next) => {
    try {
        const select = await pool.query('SELECT * FROM node_table WHERE idx=? and password =? ',[req.body.idx, req.body.password])
        

        if(select[0][0]){
            let sql = await pool.query('DELETE FROM node_table WHERE idx = ?' ,[req.body.idx]);
            return res.send('success');
        }else{
            return res.send('fail');    
        }
       
    } catch (err) {
        return res.status(500).json(err)
    }
});
module.exports = api;
