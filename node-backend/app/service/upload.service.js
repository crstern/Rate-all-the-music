const path = require('path');
const csv = require('csv-parse');
const axios = require('axios');
const fs = require('fs');
const https = require('https');
const Genre = require('../models/genre.model')
const Artist = require('../models/artist.model');
const Album = require('../models/album.model');
const sharp = require('sharp')


const uploadArtists = async () => {
  const filePath = path.join(process.cwd(), '10000-MTV-Music-Artists-page-1.csv');
  const artists = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      artists.push(row);
    })
    .on('end', () => {
      for(const [index, value] of artists.entries()){
        if (index === 60) break;
        const artistName = value[0].substring(1, value[0].length - 1)
        const url = 'theaudiodb.com/api/v1/json/1/search.php?s='.concat(artistName)
        axios.get(url).then(async resp =>  {
          if (resp.data.artists != null) {
            const artist = resp.data.artists[0];
            if (await validatePayload(artist)) {
              const artistImage = await extractArtistImage(artist);
              const artistGenre = await getOrCreateGenre(artist.strGenre);
              const data = {
                'id': artist.idArtist,
                'name': artist.strArtist,
                'originCountry': artist.strCountryCode,
                'description': artist.strBiographyEN,
                'genreId': artistGenre.dataValues.id,
                'website': artist.strWebsite,
                'facebookLink': artist.strFacebook,
                'members': artist.intMembers || 1,
                'formedYear': artist.intFormedYear,
                'recordLabel': artist.strLabel,
                'image': artistImage
              }
              const artistObj = await Artist.build(data)
              await artistObj.save()
              // add all the albums for artist
              await uploadAlbumsForArtist(artistObj.id);
            }
          }
        })
      .catch ((e) => {
        console.log(e);
      })}
    });
}

const uploadAlbumsForArtist = async (artistId) => {
  const url = 'https://theaudiodb.com/api/v1/json/1/album.php?i='.concat(artistId);
  const resp = await axios.get(url);

  for(const item in resp.data){
    if (item.strReleaseFormat !== 'Album') continue;

    const albumGenre = await getOrCreateGenre(item.strGenre);
    const albumImage = await extractAlbumImage(item);
    const data = {
      "id": item.idAlbum,
      "name": item.strAlbum,
      "artistId": item.idArtist,
      "description": item.strDescriptionEN,
      "image": albumImage,
      "genre": albumGenre,
      "releaseYear": item.intYearReleased
    }
    const albumObj = await Album.build(data);
    await albumObj.save();
  }
}

async function extracted(url, imageName) {
  try {
    const pathToImages = path.join(process.cwd(), 'images');

    if (!fs.existsSync(pathToImages)) {
      fs.mkdirSync(pathToImages, {recursive: true});
    }

    const imagePath = path.join(pathToImages, imageName);
    await axios.get(url, {
      responseType: 'arraybuffer'
    })
      .then(response => sharp(response.data).resize(350, 350).toFile(imagePath));

    return imagePath;
  } catch (e) {
    console.log(e)
  }
}

async function extractAlbumImage(payload){
  if(!payload || !payload.strAlbumThumb){
    return
  }
  const url = payload.strAlbumThumb;
  const imageName = payload.idAlbum.concat('_album.jpg');

  return await extracted(url, imageName);
}

async function extractArtistImage(payload){
  if(!payload || !payload.strArtistThumb){
    return
  }

  const url = payload.strArtistThumb;
  const imageName = payload.idArtist.concat('_artist.jpg');

  return await extracted(url, imageName);
}

async function getOrCreateGenre(name){
//  checks if the genre exist, if so, it returns the genre object
//  else creates a new one with the name specified as parameter
  name = name.replace('/', '&')
  const genreColors = ["#5f0f40ff", "#7d092fff","#9a031eff","#cb4721ff", "#fb8b24ff",
    "#ef781cff", "#e36414ff","#ae5e26ff", "#795838ff", "#0f4c5cff"]

  let existingGenre = await Genre.findOne({where: {'name': name}})
  if (existingGenre === null){
    const randNum = Math.floor(Math.random() * genreColors.length);
    existingGenre = Genre.build({
      image: genreColors[randNum],
      name: name
    })
    await existingGenre.save();
  }
  return existingGenre;
}

async function validatePayload(payload) {

  if (payload.strArtist === undefined || payload.idArtist === undefined)
    return false;

  const existingArtist = await Artist.findByPk(payload.idArtist)
  if (existingArtist)
    return false;

  if (payload.genre === undefined)
    payload.genre = 'UNKNOWN';

  return true;
}

module.exports = { uploadArtists }