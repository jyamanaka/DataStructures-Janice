var request = require('request');
const { Client } = require('pg');
const  env = {
      NODE_ENV: 'production',
      AWSRDS_EP: 'dsdemo.c2g7qw1abcde.us-east-1.rds.amazonaws.com',
      AWSRDS_PW: 'mypassword',
      PHOTON_ID: '37002e000647373034353237',
      PHOTON_TOKEN: 'b072ee1113b0329ff969fea03e4ecd5dce3a1e1b'
    };

// PARTICLE PHOTON
//var device_id = process.env.PHOTON_ID;
var device_id = env.PHOTON_ID;
var access_token = env.PHOTON_TOKEN;
var particle_variable = 'analogvalue';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

// AWS RDS POSTGRESQL INSTANCE
function createDBCredentials(){
    var db_credentials = new Object();
    db_credentials.user = 'jyamanaka';
    db_credentials.host = 'photondb.ck6xx6c2ltsk.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'photondb';
    db_credentials.password = "Hj02318826^";
    db_credentials.port = 5432;
    return db_credentials;
}

var getAndWriteData = function() {
    
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        console.log(device_url)
        // Store sensor value(s) in a variable
        if (error) 
            console.log("error=",error);
        else{
            var sv = JSON.parse(body).result;
            console.log("sv=",sv);
            
            // *******************here's where it writes to the database.
            const { Client } = require('pg');
            const client = new Client(createDBCredentials());  //added () to the function call.
            client.connect();
            //*******
            let qry = "INSERT INTO sensorData (sensorResult) VALUES (" + sv + ");";
           client.query(qry, (err, res) => {
              //makes the output more meaningful
               if (err)
                   console.log("ERROR:",err);
               else{
                   console.log("SUCCESS:",res);
                  
               }
            
               client.end();
            });
            //// *******
         }
 
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);