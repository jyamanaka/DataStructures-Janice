var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

    
    var params = {
    TableName : 'deardiarydate',
    
    //KeyConditionExpression: "#dt = :date and #dt BETWEEN :minDate and :maxDate", // the query expression
    'KeyConditionExpression': '#dt = :date AND #n = :narrative',  // the query expression
    //KeyConditionExpression: "#tp = :pk1 AND #n = :narrative", // the query expression
        'ExpressionAttributeNames': { // name substitution, used for reserved words in DynamoDB
        "#dt" : 'date',
        "#n" : 'narrative'
        
    //"#name" : "name" //"#nar" : "nar"
        
            
},
    'ExpressionAttributeValues': { // the query values
        ':date': {S: 'Sat Oct 20 2018'},
        ':narrative': {S: 'You are the judge of your own life. Use perspective and integrity. A welcome arrival of empowerment and favor.'
}
},
        //":minDate": {N: new Date("October 1, 2018").valueOf().toString()},
        //":maxDate": {N: new Date("October 20, 2018").valueOf().toString()}
    }

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});