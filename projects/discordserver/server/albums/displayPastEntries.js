module.exports={getHTML:function(){const e=require("mongodb").MongoClient,r=require("mustache");var t=require("fs");const n=new e("mongodb+srv://"+"{{MONGO USERNAME GOES HERE}}"+":"+"{{MONGO PASSWORD GOES HERE}}"+"@cluster.cjylvb8.mongodb.net/"+"Albums"+"?retryWrites=true&w=majority",{useUnifiedTopology:!0});return n.connect().then(function(e){return e.db().listCollections().toArray().then(function(e){var r=[];for(const t of e)/^[0-9]{4,4}$/.test(t.name)&&r.push(t.name);if(0===r.length)throw n.close(),"NOTHING IN THE DATABASE";return r})}).then(async function(e){var r=e.length,t={};for(const o of e)if(await n.db().collection(o).find().sort({order:1}).toArray().then(function(e){r--,t[`${o.substring(o.lastIndexOf("-")+1)}`]=e}),0===r)return await n.close(),t}).then(function(e){var n="",o=[];order=0;var s=t.readFileSync("./albums/generate-past-entries.html","utf-8");for(const t in e)o.push({year:t}),n+=r.render(s,{scope:e[t],year:t,plusOneOrder:function(){return++order}});return s=t.readFileSync("./albums/master-past-entries.html","utf-8"),r.render(s,{html:n,years:o})})}};