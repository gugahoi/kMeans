var express = require('express');
var router = express.Router();
var parse = require('csv-parse');
var fs = require('fs');

var db = require('./db');

router.get('/', function(req, res, next) {
    db.getData(db, function(data){
        res.render('index', {currentData: data});
    });
});

router.get('/loadFisher', function(req, res, next){
    db.updateData(db, require('../data').fisher(), function(data){
        res.json(data.data);
    });
});

router.post('/loadCSV', function(req, res, next){
    var csv = fs.readFileSync(req.files.csv.path, 'utf8');
    parse(csv, function(err, output){
        for(var i = 0; i < output.length; i++){
            for(var j = 0; j< output[i].length; j++){
                output[i][j] = +output[i][j];
            }
        }
        db.updateData(db, output, function(data){
            res.render('index', {currentData: data.data});
        });
    });
});

module.exports = router;
