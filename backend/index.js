let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let http = require('http');

let app = express();
let server = http.createServer(app);
let db = new sqlite3.Database('./database/employee.db');


db.run('CREATE TABLE IF NOT EXISTS users(username TEXT, pw TEXT)');
db.run('INSERT INTO users values("admin", "adminpw")');
db.run('INSERT INTO users values("shane buffy", "bladerunner")');
db.run('INSERT INTO users values("Maeve McDongagh", "adamadam")');

app.get('/', function(req,res){
    res.send("<h3> Hi there, You are going to perform CRUD operations.............[CREATE] Please enter 'http://localhost:3000/add/(id number)/(name)' to add new employee to the database.........................[READ] 'http://localhost:3000/view/(id number)' to view an employee.........................[UPDATE] 'http://localhost:3000/update/(id number)/(new name)' to update an employee.....................[DELETE] 'http://localhost:3000/del/(id number)' to delete an employee...............................Before closing this window, kindly enter 'http://localhost:3000/close' to close the database connection <h3>");
});


// // CREATE
// app.get('/add/:username/:pw', function(req,res){
//     db.serialize(()=>{
//         db.run('INSERT INTO users(username,pw) VALUES(?,?)', [req.params.username, req.params.pw], function(err) {
//             if (err) {
//                 return console.log(err.message);
//             }
//             console.log("New employee has been added");
//             res.send("New employee has been added into the database with username = "+req.params.username);
//         });
//
//     });
//
// });


// READ
app.get('/view/:username', function(req,res){
    db.serialize(()=>{
        db.each('SELECT * FROM users WHERE username =?', [req.params.username], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
            if(err){
                res.send("Error encountered while displaying");
                return console.error(err.message);
            }
            res.send(` username: ${row.username}`);
            console.log("Entry displayed successfully");
        });
    });
});


// //UPDATE
// app.get('/update/:id/:name', function(req,res){
//     db.serialize(()=>{
//         db.run('UPDATE emp SET name = ? WHERE id = ?', [req.params.name,req.params.id], function(err){
//             if(err){
//                 res.send("Error encountered while updating");
//                 return console.error(err.message);
//             }
//             res.send("Entry updated successfully");
//             console.log("Entry updated successfully");
//         });
//     });
// });
//
// // DELETE
// app.get('/del/:id', function(req,res){
//     db.serialize(()=>{
//         db.run('DELETE FROM emp WHERE id = ?', req.params.id, function(err) {
//             if (err) {
//                 res.send("Error encountered while deleting");
//                 return console.error(err.message);
//             }
//             res.send("Entry deleted");
//             console.log("Entry deleted");
//         });
//     });
//
// });




// Closing the database connection.
app.get('/close', function(req,res){
    db.close((err) => {
        if (err) {
            res.send('There is some error in closing the database');
            return console.error(err.message);
        }
        console.log('Closing the database connection.');
        res.send('Database connection successfully closed');
    });

});



server.listen(3005, function(){
    console.log("server is listening on port: 3005");
});
