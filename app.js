const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database: 'lab_10_1'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql connected...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE lab_10_1';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    });
});

// Create table
app.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(30), age int, email_id VARCHAR(30), phone_no bigint, fav_book VARCHAR(30), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('users table created...');
    });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {name:'abhirami', age: 22, email_id: 'abhiprabhu@gmail.com', phone_no: 9687576457, fav_book:'pride and prejudice'};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('user 1 added...');
    });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {name:'rudra', age: 24, email_id: 'rudra.jp@gmail.com', phone_no: 8798067896, fav_book:'the shining'};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('user 2 added...');
    });
});

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Users fetched...');
    });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('user fetched...');
    });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newName = 'ramya';
    let sql = `UPDATE users SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Name updated...');
    });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User deleted...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});