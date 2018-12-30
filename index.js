const express = require('express');
const app = express();
const port = 3000;

// -------- path: default path
app.get('/', (req, res)=>{
    const {defaultHTML} = require('./default');
    res.send(defaultHTML);
});

// // -------- path: adding students to a class
// app.get();

// // -------- path: list all students in a class
// app.get();

// // -------- path: list failing students
// app.get();

// // -------- path: list students from a specific city
// app.get();

// -------- Establishing port server connection
app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}.`);
});