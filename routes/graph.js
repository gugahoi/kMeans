var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', function(req, res, next) {
    db.getData(db, function(data){
        res.render('graph', {currentData: data});
    });
});

module.exports = router;
