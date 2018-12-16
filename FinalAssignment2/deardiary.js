var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');


// respond to requests for /deardiary
app.get('/deardiary', function(req, res) {
    ///////
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAIGADMVJ542DHZLQQ";
    AWS.config.secretAccessKey = "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";
    AWS.config.region = "us-east-1";


    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    
    // This retrieves the date I wrote my entry for the Tarot Card that I pulled and interpreted
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