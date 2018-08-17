const express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
//const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/upload', express.static(__dirname + '/upload'));
app.get('/', (req, res) => {
    res.render('index');
});
app.use(bodyParser.json());
var url = 'mongodb://localhost:27017';
var dbName = 'quiz-app';
app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    try {
        var fileUpload = req.files.ava;
        ava = '/upload/' + req.files.ava.name;
        fileUpload.mv(__dirname + '/upload/' + fileUpload.name, function (err) {
            if (err)
                console.log(err);
            else {
                console.log('File uploaded!');
            }
        });
    } catch (error) {
        var ava = "/image/ava.png";
    }
    var user = { username, password, ava };
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) console.log(err);
        else {
            const db = client.db(dbName);
            findUser('users', user.username, db, function (result) {
                console.log(result.length);
                if (result.length) {
                    if (result[0].password == user.password) {
                        res.send(user);
                        console.log('Login done');
                    }
                    else {
                        res.send('Mật khẩu sai  hoặc tên đăng nhập đã được sử dụng.');
                        console.log('Mật khẩu sai  hoặc tên đăng nhập đã được sử dụng.');
                    }

                }
                else {
                    insertToDb('users', user, db, function () {
                        client.close();
                        res.send(user);
                    });
                }
            });

        }
    });
});
app.post('/save-result', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) console.log(err);
        else {
            const db = client.db(dbName);
            insertToDb('results', req.body, db, function () {
                client.close();
                res.send('Đã lưu');
            });
        }
    });

});

const insertToDb = function (collect, data, db, callback) {
    // Get the documents collection
    const collection = db.collection(collect);
    // Insert some documents
    collection.insertMany([
        data
    ], function (err, result) {
        if (err)
            console.log('Lỗi ở insert' + err);
        else console.log('insert done');
    });
}
const findUser = function (collect, data, db, callback) {
    // Get the documents collection
    const collection = db.collection(collect);
    // Insert some documents
    collection.find({ 'username': data }).toArray(function (err, docs) {
        if (err)
            console.log('Lỗi ở find' + err);
        else
            callback(docs);
    });
}
const getRank = function (collect, data, db, callback) {
    // Get the documents collection
    const collection = db.collection(collect);
    // Insert some documents
    collection.find({ 'type': data }).toArray(function (err, docs) {
        if (err)
            console.log('Lỗi ở find' + err);
        else
            callback(docs);
    });
}
app.get('/get-rank', (req, res) => {
    var iqResult,choiceResult;
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) console.log(err);
        else {
            const db = client.db(dbName);
            getRank('results', 1, db, function (result) {
               
                iqResult=result;
              
            });
            getRank('results', 2, db, function (result) {
               
                client.close();
                choiceResult=result;
                res.send({iqResult,choiceResult});
            });
        }
    });

});
app.listen(8080, () => {
    console.log(`Server started `);
});