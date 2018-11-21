const { Client } = require('pg');
//const cTable = require('console.table');

/// AWS RDS POSTGRESQL INSTANCE
function createDBCredentials(){
    var db_credentials = new Object();
    db_credentials.user = 'jyamanaka';
    db_credentials.host = 'photondb.ck6xx6c2ltsk.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'photondb';
    db_credentials.password = "Hj02318826^";
    db_credentials.port = 5432;
    return db_credentials;
}

// Connect to the AWS RDS Postgres database
const client = new Client(createDBCredentials());
client.connect();

// Sample SQL statements for checking your work: 
var thisQuery = "SELECT * FROM sensorData;"; // print all values
var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.log(res.rows);
    }
});

client.query(secondQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.log(res.rows);
    }
});

client.query(thirdQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.log(res.rows);
    }
    client.end();
});