
var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');


function createDBCredentialsForAAMeeting(){
        // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'jyamanaka';
    db_credentials.host = 'testdb.ck6xx6c2ltsk.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'testdb';
    //db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.password = "Jkcgh26^";
    // db_credentials.password = "";
    db_credentials.port = 5432;
    return db_credentials;
}

// respond to requests for /aameetings
app.get('/aameetings', function(req, res) {

 

    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(createDBCredentialsForAAMeeting());
    /*
    // this is how the table is being built
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

    //the big long expression below is to calculate the hour from startTime. It converts the hour to a numeric based on military time
    // takes into account whether time is AM or PM. 

    //uses these variables to modify my query
    var hourStart = 18 ;  //hourToSelect is in military time - change this to change the query for different times
    var hourEnd = 18;
    var dayToSelect = "Wednesdays";

    var  day = req.param("day");
    var  startHour = req.param("start_hour");
    var  endHour = req.param("end_hour");

    if (day){
        dayToSelect = day;
    }
    
    if (startHour){
      hourStart = startHour;
      hourEnd = startHour;
    } 

    if (endHour){
        hourEnd = endHour;
    }
    console.log("dayToSelect=",dayToSelect, 'hourStart=',hourStart,'hourEnd=',hourEnd);

    //uses these variables to modify the query and give it a position from the buttons
    var thisQuery = "SELECT newAddress as mtgaddress, title as location, long, lat, json_agg(json_build_object('day', day, 'startTime', startTime ,'endTime', endTime)) as meetings " +
                 "FROM aaMeetings " +  
                 "WHERE day = '" + dayToSelect + "' " + 
                 " AND to_number(LEFT(startTime,POSITION(':' in startTime)-1),'99') + (12 * POSITION('PM' in RIGHT(startTime,2))) " +
                 " + (POSITION('12' in LEFT(startTime,2)) * POSITION('AM' in RIGHT(startTime,2)) * 12) " +
                 " - (POSITION('12' in LEFT(startTime,2)) * POSITION('PM' in RIGHT(startTime,2)) * 12) " +
                 ">= " + hourStart +
                 " AND to_number(LEFT(startTime,POSITION(':' in startTime)-1),'99') + (12 * POSITION('PM' in RIGHT(startTime,2))) " +
                 " + (POSITION('12' in LEFT(startTime,2)) * POSITION('AM' in RIGHT(startTime,2)) * 12) " +
                 " - (POSITION('12' in LEFT(startTime,2)) * POSITION('PM' in RIGHT(startTime,2)) * 12) " +
                 "<= " + hourEnd +
                 " GROUP BY newAddress, title, long, lat;";
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
    

var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/leaflet_project.html'));
});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});
