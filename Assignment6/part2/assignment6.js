var diaryEntries = [];

class DiaryEntry {
  constructor(date, name, major, meaning, narrative) {
    this.dt = {};
    //this.pk.S = primaryKey.toString();
    this.dt = {}; 
    this.dt.S = new Date(date).toDateString();
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

diaryEntries.push(new DiaryEntry('October 8, 2018', "Justice", true, "Sword held by the woman is the symbol of truth, wisdom and order","Reading further, this says to have perspective - and for every action there is a reaction.  I LOVE THIS."));
diaryEntries.push(new DiaryEntry('October 9, 2018', "The Hanged Man", true, "Card of willing self-sacrifice, accepting face and spiritual enlightenment", "Says that this symbolizes our unconscious, where nothing is quite what it appears to be!"));
diaryEntries.push(new DiaryEntry('October 10, 2018', "The Moon", true, "The moon rises above an unquiet landscape of elusive dreams and fearful imaginings", "WORRIED - this says that the moon reveals what is concealed!"));
diaryEntries.push(new DiaryEntry('October 11, 2018', "The Chariot", true, "Progress preceded by significant struggle, which is yin and yang","A chariot brings awareness of the fluidity of life."));
diaryEntries.push(new DiaryEntry('October 16, 2018', "Judgement", true, "Time to decide about the past.  Changes are on the horizon but need to feel that you've acted with integrity","Have to make peace with the past and move on.  This card asks to explore your potential! Wisdom and confidence to come."));
diaryEntries.push(new DiaryEntry('October 17, 2018', "VI of Pentacles", false, "Receiving money, passively as a gift, an inheritance, as a sign that your circumstances will certainly improve","This just happened to me today - the sale of Herman's family home in Los Angeles."));
diaryEntries.push(new DiaryEntry('October 18, 2018', "IV of Cups", false, "Disenchanted - yearning for change, but don't know how and what you want","In limbo, maybe?  but rather than wait, it says to take some action and control to make life happen."));
diaryEntries.push(new DiaryEntry('October 19, 2018', " VII of Cups", false, "There were 7 cups with meaning-nothing is real yet.Reflection, Imagination, theres plenty of choices, but what is real and what is fantasy?", "This card seems to go with above card from yesterday.Waiting around, in limbo don't rush, and pay attention.")); 
diaryEntries.push(new DiaryEntry('October 20, 2018', " Judgement", true, "You are the judge of your own life.  Use perspective and integrity.  A welcome arrival of empowerment and favor.", "Rather than thinking that this is judgement vs. me, seems like its in my own best interests.")); 
diaryEntries.push(new DiaryEntry('October 21, 2018', " X of Wands, reversed", false, "Stress or a burden perceived, rather than real.  Lighten up, girl.", "Don't try to make too many people happy - make space for my own needs -- DEFINITELY will.Will ultimately see the way forward more clearly if I do.")); 
diaryEntries.push(new DiaryEntry('October 22, 2018', " II of Pentacles, reversed", true, "Egotism and pride get in the way of financial gain and practicality.  A reckless handling of money.", "Yikes, just when things were going well.  An end of a business partnership.  Better be careful today.")); 
diaryEntries.push(new DiaryEntry('October 23, 2018', " V of Pentacles", false, "Testdfdfdxfxcf", "Test")); 


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
params.TableName = "deardiarydate";
let timer = setInterval(insertItem, 1000);
function insertItem(){
  
  dynamodb.putItem(params);
  params.Item = diaryEntries[x]; 
  params.TableName = "deardiarydate";
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