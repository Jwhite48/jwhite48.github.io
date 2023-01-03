const fs = require('fs');
const dpeAlbums = require('./albums/displayPastEntries.js');
const dpeFilms = require('./films/displayPastEntries.js');

async function generate(){
  try{
    const albumsHTML = await dpeAlbums.getHTML();
    const filmsHTML = await dpeFilms.getHTML();

    fs.writeFileSync('./albums/albums.html', albumsHTML);
    fs.writeFileSync('./films/films.html', filmsHTML);

    return "GENERATED ALBUMS AND FILMS HTML";
  }catch(e){
    return e;
  }
}

generate().then(function(err){
  console.log(err);
});
