module.exports = {
  getHTML: function() {
    //Set up modules necessary for the program
    const MongoClient = require('mongodb').MongoClient;
    const Mustache = require('mustache');
    var fs = require('fs');

    //Set up constants to connect to MongoDB
    const database_user_name = '{{MONGO USERNAME GOES HERE}}';
    const database_user_password = '{{MONGO PASSWORD GOES HERE}}';
    const database_name = 'Albums';
    const uri = 'mongodb+srv://'+database_user_name+':'+database_user_password+'@cluster.cjylvb8.mongodb.net/'+database_name+'?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    var html = client.connect().then(function(db) {
      var list = db.db().listCollections().toArray().then(function(arr) {
        var temp = [];
        for(const obj of arr){
          if(/^[0-9]{4,4}$/.test(obj.name)){
            temp.push(obj.name);
          }
        }
        if(temp.length === 0){
          client.close();
          throw 'NOTHING IN THE DATABASE';
        }
        return temp;
      });
      return list;
    }).then(async function(list) {
      var pendingGrabs = list.length;
      var collections = {};
      for(const collName of list){
        await client.db().collection(collName).find().sort({order: 1}).toArray().then(function(res) {
          pendingGrabs--;
          collections[`${collName.substring(collName.lastIndexOf('-')+1)}`] = res;
        });
        if(pendingGrabs===0){
          await client.close();
          return collections;
        }
      }
    }).then(function(collections) {
      var masterMustache = ''; var yearsArr = []; order = 0;
      var template = fs.readFileSync('./albums/generate-past-entries.html', 'utf-8');
      for(const key in collections){
        yearsArr.push({year: key});
        masterMustache+=Mustache.render(template, {scope: collections[key], year: key,
        plusOneOrder: function(){
          return ++order;
        }
        });
      }
      template = fs.readFileSync('./albums/master-past-entries.html', 'utf-8');
      return Mustache.render(template, {html: masterMustache, years: yearsArr});
    });

    return html;
  }
}
