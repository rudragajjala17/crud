const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'crud-db.cny1r7r1hkgd.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'crudadmin',
    database: 'CRUDDataBase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Welcome to sample demo");
});

app.get("/health-status", (req, res) => {
    res.send("App is Running Healthy, Thank you");
});

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews"
    db.query(sqlSelect, (err, result)=> {
        res.send(result);
    });
});

app.post('/api/insert', (req, res)=> {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES(?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result)=> {
    });
});

app.delete('/api/delete/:movieName', (req, res)=> {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDelete, name, (err, result)=> {
        if(err) console.log(err)
    });
});

app.put('/api/update', (req, res)=> {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [review, name], (err, result)=> {
        if(err) console.log(err)
    });
});

app.listen(3002, () => {
    console.log("running on port 3002");
});
