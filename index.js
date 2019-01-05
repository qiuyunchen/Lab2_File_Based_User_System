const fs = require('fs');
const {displayObj} = require('./services/display');
const express = require('express');
const app = express();
const port = 3000;

// -------- path: default paths
app.get('/', (req, res)=>{
    const {defaultHTML} = require('./services/default');
    res.send(defaultHTML);
});

app.get('/class', (req, res)=>{
    const {defaultHTML} = require('./services/default');
    res.send(defaultHTML);
});

// -------- path: adding students to a class
app.get('/class/add', (req, res)=>{
    const className = req.query.class;
    const arrOfReqdKeys = ['name','age','city','grade'];
    const success = {added: {}, class:`#${className}#`};
    const error = {};
    arrOfReqdKeys.forEach( key =>{
        if (req.query[key]){
            success.added[key] = req.query[key];
        } else {
            error.error = `#Please fill out all the information for the student#`;
        }
    });

    fs.readFile(`./classes/${className}.json`, 'utf8', (err, data)=>{
        if (err) { // need to create new class and save student to class
            if (error.error) {
                res.send( displayObj(error) );
            } else {
                const thisClass = {students:[success.added]};
                fs.writeFile(`./classes/${className}.json`, JSON.stringify(thisClass), (err) =>{
                    if(err) {
                        error.error = '#something went wrong and the student could not be added#';
                        res.send( displayObj(error) );
                    } else {
                        res.send( displayObj(success) );
                    }
                });
            }
        } else { // class already exists, just need to update class
            if (error.error) {
                res.send( displayObj(error) );
            } else {
                const thisClass = JSON.parse(data);
                // check for existing student
                const existingStud = thisClass.students.filter( s => s.name === success.added.name);
                if (existingStud.length === 0){
                    thisClass.students.push(success.added);
                } else {
                    thisClass.students.forEach( s => {
                        if (s.name === success.added.name) {
                            s.age = success.added.age;
                            s.city = success.added.city;
                            s.grade = success.added.grade;
                        }
                    });
                }
                // update class
                fs.writeFile(`./classes/${className}.json`, JSON.stringify(thisClass), err =>{
                    if(err) {
                        error.error = `#something went wrong and the student could not be added#`;
                        res.send( displayObj(error) );
                    } else {
                        res.send( displayObj(success) );
                    }
                }); 
            }
        }
    });
});

// -------- path: list all students in a class
app.get('/class/list', (req, res) =>{
    fs.readFile(`./classes/${req.query.class}.json`, 'utf8', (err, data) =>{
        if (err) {
            const error = {error:`#${req.query.class} class doesn't exist lol#`}
            res.send( displayObj(error) );
        } else {
            res.send( displayObj(JSON.parse(data)) );
        } 
    });
});

// -------- path: list failing students
app.get('/class/listfailing', (req, res) =>{
    fs.readFile(`./classes/${req.query.class}.json`, 'utf8', (err, data) =>{
        if (err) {
            const error = {error: `#${req.query.class} class doesn't exist lol#`}
            res.send( displayObj(error) );
        } else {
            const clas = JSON.parse(data);
            const failers = clas.students.filter(s => s.grade < 50);
            const result = {students: failers};
            res.send( displayObj(result) );
        } 
    });
});

// -------- path: list students from a specific city
app.get('/class/listfromcity', (req, res) =>{
    fs.readFile(`./classes/${req.query.class}.json`, 'utf8', (err, data) =>{
        if (err) {
            const error = {error: `#${req.query.class} class doesn't exist lol#`}
            res.send( displayObj(error) );
        } else {
            if (req.query.city) {
                const clas = JSON.parse(data);
                const arr = clas.students.filter(s => s.city.toLowerCase() === req.query.city.toLowerCase());
                const result = {students: arr};
                res.send( displayObj(result) );
            } else {
                const error = {error: `#You didn't pass in the city that you want to search.#`}
                res.send( displayObj(error) );
            }
        }
    });
});

// -------- Establishing port server connection
app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}.`);
});