// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');
var hw2 = '';

// load the hw5 text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('../Assignment1/hw5.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of Address/Locations
$('td').each(function(i, elem) {  //'each is a loop  //all the addresses were in tables'
    //console.log($(elem).text());
    if ($(elem).attr('style') == 'border-bottom:1px solid #e3e3e3; width:260px') {
        console.log($(elem).html().split('<br>')[2].trim().split(',')[0]);
        hw2 += ($(elem).html().split('<br>')[2].trim().split(',')[0]) + '\n';
    }
});

// write the project addresses to a text file
//var address = ''; // this variable will hold the lines of text

//$('td').each(function(i, elem) {
    //address += ($(elem).text()) + '\n';
//});

fs.writeFileSync('hw2.txt', hw2);
//fs.writeFileSync('Assignment2/thesis_test.txt', thesisTitles);