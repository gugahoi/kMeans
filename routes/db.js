var nedb = require('nedb');
var db = new nedb({filename: './data.json', autoload: true});

function generateArray(){
    var currentData = [];
    for(var i = 0; i < 20; i++){
        currentData[i] = [];
        for(var j = 0; j < 3; j++){
            currentData[i][j] = Math.floor(Math.random()*50);
        }
    }
    return currentData;
}

// Clear db and regenerate values
db.remove({}, {multi: true}, function(err, numRemoved){
    db.loadDatabase(function(err){
        console.log('Database cleared. Starting with fresh one');
        db.insert({data: generateArray()}, function(err, newDoc){
            console.log('Generated Random Data successfully');
        });
    });
});

// export db
module.exports = db;

// export function to udpdate data
module.exports.updateData = function(db, newData, next){
    db.remove({}, {multi: true}, function(err, numRemoved){
        db.loadDatabase(function(err){
            console.log('Database cleared. Starting with fresh one');
            db.insert({data: newData}, function(err, newDoc){
                next(newDoc);
            });
        });
    });
};

// export function to get data
module.exports.getData = function(db, next) {
    db.find({}, function (err, newDoc) {
        next(newDoc[0].data);
    });
};