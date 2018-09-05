// npm install request
// mkdir data

var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m1.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw1.txt', body);
    }
    else {console.log("Request failed!")}
});
