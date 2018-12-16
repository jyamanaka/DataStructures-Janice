var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');

// AWS RDS credentials
function createDBCredentialsForSensor(){
    var db_credentials = new Object();
    db_credentials.user = 'jyamanaka';
    db_credentials.host = 'photondb.ck6xx6c2ltsk.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'photondb';
    db_credentials.password = "Jkcgh26^";
    db_credentials.port = 5432;
    return db_credentials;
}


// respond to requests for /sensor
app.get('/sensor', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(createDBCredentialsForSensor());

    // SQL query 
    //changed because the sensorValue field is null. sensorValue is for sensor positioning
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorResult) as average_result,
             COUNT(sensorResult) as occurances
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;

     
     //this overides above and reads all data without grouping by day, so I can get variations of color
    q = `SELECT sensorTime,
             sensorResult as average_result
             FROM sensorData
             ORDER BY sensorTime;`;
        

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { 
            console.log(qerr); 
            throw qerr; 
        }
        else {
            res.send(qres.rows);
            client.end();
            console.log('1) responded to request for sensor data');
        }
    });
});



var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});