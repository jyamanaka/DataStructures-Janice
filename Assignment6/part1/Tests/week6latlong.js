
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs'); // npm install file-system

var apiKey = "503df1365d4f49ba8d299d28e3ae0414"

var data = JSON.parse(fs.readFileSync('outputLatLong.json'));


console.log(typeof(data));

console.log(data[0].address)

var addressArray = []

data.forEach(function(element) {
  return addressArray.push(element.address)
});
let newObject=[];
console.log(addressArray)

var addresses = addressArray;
// var meetingsData = [];

async.eachSeries(addresses, function(value, callback, last) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    console.log(apiKey)
    console.log(apiRequest);
    
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        console.log('Connected')
        var tamuGeo = JSON.parse(body);
        sa = tamuGeo["InputAddress"]["StreetAddress"];
        console.log(tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"]);
        lat = tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"];
        lon = tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Longitude"];
        fs.appendFileSync('latlong.json', JSON.stringify({"address":sa,"lat":lat,"lon":lon}));
        newObject.push({"address":sa,"lat":lat,"lon":lon});
        if (last)
                fs.appendFileSync('latlong.json', ']');  // close JSON at end
            else
                fs.appendFileSync('latlong.json', ',');
    });
    setTimeout(callback, 750);
}, function() {
    console.log(meetingsData);
});

fs.writeFileSync('latlong.json', '[');