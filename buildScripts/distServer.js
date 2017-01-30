import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression()); //GZIP for compression
app.user(express.statis('dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.get('/users', function(req, res) {
   // Temporary hardcoded data
   res.json([
        {"id": 1, "firstName": "Mickey", "lastName": "Mouse", "email": "mickey@disney.com"},
        {"id": 2, "firstName": "Minnie", "lastName": "Mouse", "email": "minnie@disney.com"},
        {"id": 3, "firstName": "Donald", "lastName": "Duck", "email": "donald@disney.com"}
    ]);
});

app.listen(port, function(err){
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
})