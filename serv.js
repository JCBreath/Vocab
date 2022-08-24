const http = require('http');
const XLSX = require("xlsx");
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

var workbook = XLSX.readFile("3000.xlsx");

const sheets = workbook.SheetNames
const sheet_json = XLSX.utils.sheet_to_json(workbook.Sheets['3000']);

const order = JSON.parse(fs.readFileSync('order.json'));

console.log(sheet_json[0]);
console.log(order);

app.use(express.static('./'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/order', function(req, res) {
    res.json(order);
});

app.get('/word', function(req, res) {
    var id = req.query.id;
    res.json(sheet_json[id]);
});

app.get('/list', function(req, res) {
    var unit = parseInt(req.query.unit);
    var start = (unit-1)*100;
    var end = start + 100;
    if(end > order.length) {
        end = order.length;
    }
    
    var words = [];

    for(let i=start; i<end; i++) {
        words.push({index:i, word:sheet_json[order[i]]['Word']})
    }

    res.json(words);
});

const port = 80;

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});