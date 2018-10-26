var fs = require('fs'); // npm install file-system

var apiKey = "503df1365d4f49ba8d299d28e3ae0414"

var data = JSON.parse(fs.readFileSync('latlong.json'));


console.log(typeof(data));

console.log(data[0].street)

var addressArray = []

data.forEach(function(element) {
  return addressArray.push(element.street)
});
console.log(addressArray)

let newObject=[];