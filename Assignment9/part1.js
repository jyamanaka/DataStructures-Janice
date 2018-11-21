const { Client } = require('pg');

// AWS RDS POSTGRESQL INSTANCE
function createDBCredentials(){
    var db_credentials = new Object();
    db_credentials.user = 'jyamanaka';
    db_credentials.host = 'photondb.ck6xx6c2ltsk.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'photondb';
    //db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.password = "Hj02318826^";
    // db_credentials.password = "";
    db_credentials.port = 5432;
    return db_credentials;
}
// Connect to the AWS RDS Postgres database

const client = new Client(createDBCredentials());  //added () to the function call.
client.connect();

// Sample SQL statement to create a table: 
/*var thisQuery = "CREATE TABLE sensorData ( sensorValue boolean, sensorTime timestamp DEFAULT current_timestamp, sensorResult value );";*/

//Var thisQuery = "CREATE TABLE sensorData ( sensorValue boolean, sensorTime timestamp DEFAULT current_timestamp, sensorResult numeric(5,2) );";

// Sensor result is a number -
var thisQuery = "CREATE TABLE sensorData ( sensorValue boolean, sensorTime timestamp DEFAULT current_timestamp, sensorResult numeric(10,2) );";

client.query(thisQuery, (err, res) => {
  //makes the output more meaningful
   if (err)
       console.log("ERROR:",err);
   else
       console.log("SUCCESS:",res);

    client.end();
});
