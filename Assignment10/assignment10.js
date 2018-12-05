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
    db_credentials.password = "Pbwilson26^";
    db_credentials.port = 5432;
    return db_credentials;
}

function createDBCredentialsForAAMeeting(){
        // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'jyamanaka';
    db_credentials.host = 'testdb.ck6xx6c2ltsk.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'testdb';
    //db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.password = "Pbwilson26^";
    // db_credentials.password = "";
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

// respond to requests for /aameetings
app.get('/aameetings', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(createDBCredentialsForAAMeeting());
    /*
    // this is how we built the table
    let qry = "INSERT INTO aaMeetings VALUES (" + newAddress + ", " + 
                                                         lat + ", " + 
                                                         long + ", " +
                                                         title + ", " +
                                                         wheelc + ", " +
                                                         details + ", " +
                                                         day + ", " +
                                                         startTime + ", " +
                                                         endTime + ", " +
                                                         meetingType +                                              
                                                      ");";
    */

    //the big long expression is to calculate the hour from startTime. it converts hour to a numeric based on military time
    // taking into account whether time is AM or PM. 

    //use these variables to modify the query
    var hourToSelect = 18;  //hourToSelect is in military time - change this to change the query for different times
    var dayToSelect = "'Tuesdays' ";
    var operation = ">=";

    var thisQuery = "SELECT newAddress as mtgaddress, title as location, json_agg(json_build_object('day', day, 'startTime', startTime )) as meetings " +
                 "FROM aaMeetings " +  
                 "WHERE day = " + dayToSelect +
                 "AND to_number(LEFT(startTime,POSITION(':' in startTime)-1),'99') + (12 * POSITION('PM' in RIGHT(startTime,2))) " +
                 " + (POSITION('12' in LEFT(startTime,2)) * POSITION('AM' in RIGHT(startTime,2)) * 12) " +
                 " - (POSITION('12' in LEFT(startTime,2)) * POSITION('PM' in RIGHT(startTime,2)) * 12) " +
                 operation + hourToSelect +
                 "GROUP BY newAddress, title;";
/*
date_part('hour', timestamp '2001-02-16 20:38:40')
*/
    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

// respond to requests for /deardiary
app.get('/deardiary', function(req, res) {
    ///////
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAIZ6HUP5AEA6VGBWA";
    AWS.config.secretAccessKey = "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";
    AWS.config.region = "us-east-1";

    /*var AWS = require('aws-sdk');
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = process.env.AWS_ID;
    AWS.config.secretAccessKey = process.env.AWS_KEY;
    AWS.config.region = "us-east-1";

   var dynamodb = new AWS.DynamoDB();
   let x = 0;
   */
    
    ////////////

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    
    ////
   
    var params = {
        TableName: "deardiarydate",
        KeyConditionExpression: "dt = :date", 
        ExpressionAttributeValues: {":date": {"S": "Sat Oct 20 2018"}
        }
    };



    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            res.send(data.Items);
            console.log('3) responded to request for dear diary data');
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
