//Set up modules needed for the program
var Discogs = require('disconnect').Client;
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

//Set up constants needed for connecting to Discogs and MongoDB
const discogs_key = '{{DISCOGS API KEY GOES HERE}}';
const database_user_name = '{{MONGO USERNAME GOES HERE}}';
const database_user_password = '{{MONGO PASSWORD GOES HERE}}';
const database_name = 'Albums';
const uri = 'mongodb+srv://'+database_user_name+':'+database_user_password+'@cluster.cjylvb8.mongodb.net/'+database_name+'?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useUnifiedTopology: true });
var db = new Discogs({userToken: discogs_key}).database();

//Enter specified collection name
const cName = '{{COLLECTION NAME}}';
//Enter specified path to list file
const fileN = './album_lists/{{FILE NAME}}';

var releases = [];
var text = fs.readFileSync(fileN, 'utf-8');
var textByLine = text.split('\n');
for(let i=0; i<textByLine.length; i++){
  if(i===0){
    releases[0] = parseInt(textByLine[i].trim());
  }else{
    releases.push({});
    releases[releases.length-1]['artist'] = (textByLine[i].substring(0,textByLine[i].indexOf('-'))).trim();
    releases[releases.length-1]['name'] = (textByLine[i].substring(textByLine[i].indexOf('-')+1)).trim();
  }
}

var savesPending = releases.length-1;
client.connect(function(err, mDB) {
  for(let i=1; i<releases.length; i++){
    db.search(`${releases[i].artist} - ${releases[i].name}`, {type: 'release', page: 1, pages: 1, per_page: 5}, async function(err, data){
      console.log(`${releases[i].artist} - ${releases[i].name}`);
      var docObj = {country: '', year: '', label: '', genres: [], styles: [], _id: '', order: i+releases[0]-1, url: 'discogs.com',
        img_url: '', type: 'release', name: releases[i]['name'], artist: releases[i]['artist']};
      docObj['country'] = data.results[0]['country']; docObj['year'] = data.results[0]['year']; docObj['label'] = data.results[0]['label'][0];
      docObj['genres'] = data.results[0]['genre']; docObj['styles'] = data.results[0]['style']; docObj['_id'] = data.results[0]['id'];
      docObj['url'] += data.results[0]['uri']; docObj['img_url'] = data.results[0]['cover_image'];
      await mDB.db().collection(cName).insertOne(docObj);
      savesPending--; console.log(savesPending);
      if(savesPending===0) {
        console.log('DONE!');
        await mDB.close();
      }
    });
  }
});
