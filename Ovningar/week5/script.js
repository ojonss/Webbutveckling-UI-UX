const express = require('express');
const mysql = require('mysql2');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: process.end.USER,
    password: process.env.PWD,
    database: 'nodejs_rest_api',

});

db.connect((err) => {
    if(err) {
        console.error('Error connecting to my SQL', err);
        return;
    }
    console.log('Connected to database');
})

app.listen(POST, () => {
    console.log('Server is running on http://localhost:$(PORT)');
});

//Get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

//Get specific user by ID
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    db.query('SELECT * FROM users WHERE id = ?',[id], (err, results) => {
        if(err) throw err;
        res.json(results[0]);
    });
});

//Spaka användare
app.post('/users', (req, res) => {
    const {name, email} = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if(err) throw err;
        res.json({message: 'User added successfully', id: result.insertID});
    });
})

