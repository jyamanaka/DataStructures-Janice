var diaryEntries = [];

class DiaryEntry {
  constructor(primaryKey, date, name, major, meaning, narrative) {
    this.pk = {};
    this.pk.S = primaryKey.toString();
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.name = {};
    this.name.S = name;
    this.major = {};
    this.major.BOOL = major;
    this.meaning = {};
    this.meaning.S = meaning;
    if (narrative != null) {
      this.narrative = {};
      this.narrative.S = narrative; 
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

diaryEntries.push(new DiaryEntry(0, 'October 8, 2018', "Justice", true, "Sword held by the woman is the symbol of truth, wisdom and order","Reading further, this says to have perspective - and for every action there is a reaction.  I LOVE THIS."));
diaryEntries.push(new DiaryEntry(1, 'October 9, 2018', "The Hanged Man", true, "Card of willing self-sacrifice, accepting face and spiritual enlightenment", "Says that this symbolizes our unconscious, where nothing is quite what it appears to be!"));
diaryEntries.push(new DiaryEntry(2, 'October 10, 2018', "The Moon", true, "The moon rises above an unquiet landscape of elusive dreams and fearful imaginings", "WORRIED - this says that the moon reveals what is concealed!"));
diaryEntries.push(new DiaryEntry(3, 'October 11, 2018', "The Chariot", true, "Progress preceded by significant struggle, which is yin and yang","A chariot brings awareness of the fluidity of life."));

console.log(diaryEntries);



var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();
let x = 0;

let params = {};
params.Item = diaryEntries[x]; 
params.TableName = "deardiary";
let timer = setInterval(insertItem, 1000);
function insertItem(){
  
  dynamodb.putItem(params);
  params.Item = diaryEntries[x]; 
  params.TableName = "deardiary";
  x++;
  
  if (x=== diaryEntries.length){
  clearInterval(timer);

  }
  dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack,'error'); // an error occurred
  else     console.log(data,'data');           // successful response
});

  }


// var params = {
//   Item: {
//   "AlbumTitle": {
//     S: "Somewhat Famous"
//     }, 
//   "Artist": {
//     S: "No One You Know"
//     }, 
//   "SongTitle": {
//     S: "Call Me Today"
//     }
//   }, 
//   ReturnConsumedCapacity: "TOTAL", 
//   TableName: "Music"
// };