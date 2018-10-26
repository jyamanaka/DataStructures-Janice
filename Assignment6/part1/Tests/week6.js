const { Client } = require('pg');
//const cTable = require('console.table');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jyamanaka';
db_credentials.host = 'week6db1.ck6xx6c2ltsk.us-east-1.rds.amazonaws.com';
db_credentials.database = 'week6db1';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
const makeDB = "DROP TABLE IF EXISTS aadata; CREATE TABLE aadata (mtgday varchar(25), mtgtime varchar(25), mtghour int, mtglocation varchar(75), mtgaddress varchar(75), mtgregion varchar(75), mtgtypes varchar(150));";
//DROP TABLE IF EXISTS aadata;

var thisQuery = "SELECT mtgday, mtgtime, mtglocation, mtgaddress, mtgtypes FROM aadata WHERE mtgday = 'Monday' and mtghour >= 7;";

client.query(makeDB, (err, res) => {
    // if (err) {throw err}
    // else {
        console.log(err, res);
        client.end();
    }
);

// client.query(thisQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//         console.table(res.rows);
//         client.end();
//     }
// });