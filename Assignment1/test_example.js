// npm install request
// mkdir data

var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/aa/m01.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw1.txt', body);
    }
    else {console.log("Request 1 failed!")}
});

request('https://parsons.nyc/aa/m02.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw2.txt', body);
    }
    else {console.log("Request 2 failed!")}
});

request('https://parsons.nyc/aa/m03.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw3.txt', body);
    }
    else {console.log("Request 3 failed!")}
});
    
request('https://parsons.nyc/aa/m04.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw4.txt', body);
    }
    else {console.log("Request 4 failed!")}
});

request('https://parsons.nyc/aa/m05.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw5.txt', body);
    }
    else {console.log("Request 5 failed!")}
});

request('https://parsons.nyc/aa/m06.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw6.txt', body);
    }
    else {console.log("Request 6 failed!")}
});

request('https://parsons.nyc/aa/m07.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw7.txt', body);
    }
    else {console.log("Request 7 failed!")}
});

request('https://parsons.nyc/aa/m08.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw8.txt', body);
    }
    else {console.log("Request 8 failed!")}
});


request('https://parsons.nyc/aa/m09.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw9.txt', body);
    }
    else {console.log("Request 9 failed!")}
});

request('https://parsons.nyc/aa/m10.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/hw10.txt', body);
    }
    else {console.log("Request 10 failed!")}
});
