const { Client } = require('pg');
var async = require('async');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jyamanaka';
db_credentials.host = 'testdb.ck6xx6c2ltsk.us-east-1.rds.amazonaws.com';
db_credentials.database = 'testdb';
db_credentials.password = process.env.AWSRDS_PW;
// db_credentials.password = "";
db_credentials.port = 5432;

var addressesForDb = [{"Address":"122 E 37TH ST New York NY ","LatLong":{"lat":"40.7483929","lng":"-73.9787906"}},{"Address":"30 E 35TH ST New York NY ","LatLong":{"lat":"40.7479892","lng":"-73.9817564"}},{"Address":"350 E 56TH ST New York NY ","LatLong":{"lat":"40.757654","lng":"-73.963834"}},{"Address":"619 LEXINGTON AVE New York NY ","LatLong":{"lat":"40.7588016","lng":"-73.9704542"}},{"Address":"122 E 37TH ST New York NY ","LatLong":{"lat":"40.7483929","lng":"-73.9787906"}},{"Address":"28 E 35TH ST New York NY ","LatLong":{"lat":"40.748023","lng":"-73.9818371"}},{"Address":"350 E 56TH ST New York NY ","LatLong":{"lat":"40.757654","lng":"-73.963834"}},{"Address":"283 LEXINGTON AVE New York NY ","LatLong":{"lat":"40.7479969","lng":"-73.9783809"}},{"Address":"122 E 37TH ST New York NY ","LatLong":{"lat":"40.7483929","lng":"-73.9787906"}},{"Address":"619 LEXINGTON AVE New York NY ","LatLong":{"lat":"40.6894374","lng":"-73.9367705"}},{"Address":"141 E 43RD ST New York NY ","LatLong":{"lat":"40.7518754","lng":"-73.9747248"}},{"Address":"122 E 37TH ST New York NY ","LatLong":{"lat":"40.7483929","lng":"-73.9787906"}},{"Address":"122 E 37TH ST New York NY ","LatLong":{"lat":"40.7483929","lng":"-73.9787906"}},{"Address":"141 E 43RD ST New York NY ","LatLong":{"lat":"40.7518754","lng":"-73.9747248"}},{"Address":"209 MADISON AVE New York NY ","LatLong":{"lat":"40.7486487","lng":"-73.9821254"}},{"Address":"122 E 37TH ST New York NY ","LatLong":{"lat":"40.7483929","lng":"-73.9787906"}},{"Address":"619 LEXINGTON AVE New York NY ","LatLong":{"lat":"40.6894374","lng":"-73.9367705"}},{"Address":"240 E 31ST ST New York NY ","LatLong":{"lat":"40.6447249","lng":"-73.948097"}},{"Address":"114 E 35TH ST New York NY ","LatLong":{"lat":"40.7473169","lng":"-73.9800724"}},{"Address":"230 E 60TH ST New York NY ","LatLong":{"lat":"40.7615607","lng":"-73.9649474"}},{"Address":"244 E 58TH ST New York NY ","LatLong":{"lat":"40.7600925","lng":"-73.9653811"}},{"Address":"619 LEXINGTON AVE New York NY ","LatLong":{"lat":"40.6894374","lng":"-73.9367705"}},{"Address":"325 PARK AVE New York NY ","LatLong":{"lat":"40.7574552","lng":"-73.9733937"}},{"Address":"236 E 31ST ST New York NY ","LatLong":{"lat":"40.74314","lng":"-73.9781525"}},{"Address":"308 E 55TH ST New York NY ","LatLong":{"lat":"40.7576943","lng":"-73.9657436"}},{"Address":"244 E 58TH ST New York NY ","LatLong":{"lat":"40.6492925","lng":"-73.9225408"}},{"Address":"244 E 58TH ST New York NY ","LatLong":{"lat":"40.7600925","lng":"-73.9653811"}},{"Address":"109 E 50TH ST New York NY ","LatLong":{"lat":"40.7570109520275","lng":"-73.9733483642645"}}]

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.Address + "', " + value.LatLong.lat + ", " + value.LatLong.lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
});