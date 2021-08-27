import requests
from sqlalchemy import and_, not_

from apps import db
from apps.api.models import (
    Album,
    Genre,
    Artist,
    Rating
)
from .genre_service import get_or_create_genre
from .image_service import extract_art_cover
from apps.api.utils import (
    NotFound,
    InvalidPayload, ConflictError,
)


def get_album_details_by_id(album_id):
    """
    returns an album specified by its id
    :param album_id:
    :return:
    """
    if isinstance(album_id, int) or not album_id.isnumeric():
        raise InvalidPayload("album_id must be integer")
    album = Album.query.get(album_id)

    if album is None:
        raise NotFound("Album not found")

    album.genre = Genre.query.get(album.genre_id)
    album.other_albums = Album.query.filter(
        Album.artist_id == album.artist_id,
        not_(Album.id == album.id)
    ).all()
    album.ratings = Rating.query.filter(
        album.id == Rating.album_id,
    ).order_by(Rating.number_of_likes.desc()).all()

    return album


def fetch_albums_by_artist_id(artist_id):
    """
    Adds all albums created by a specific artist
    :param artist_id: id of the artist
    :return:
    """
    link = f'https://theaudiodb.com/api/v1/json/1/album.php?i={artist_id}'
    albums = requests.get(link).json()['album']
    if albums is not None:
        for album in albums:
            if validate_album(album) is False:
                continue
            image_obj = extract_art_cover(album)
            if album.get("strGenre") is None or album.get("strGenre") == "":
                album["strGenre"] = "UNKNOWN"
            album_genre = get_or_create_genre(album.get("strGenre"))
            album_dict = {
                "id": album.get('idAlbum'),
                "artist_id": artist_id,
                "name": album.get('strAlbum'),
                "description": album.get('strDescriptionEN'),
                "image": image_obj,
                "release_year": album.get('intYearReleased'),
                "genre_id": album_genre.id,
                "total_note": 0,
            }

            try:
                album_obj = Album(**album_dict)
                db.session.add(album_obj)
                db.session.commit()
                print('Successfully added', album_obj.name)
            except Exception as e:
                print(e)
                raise ConflictError("Error while saving the album")


def validate_album(album):

    if Album.query.filter_by(id=album.get('idAlbum')).first() is not None:
        return False
    if album.get('strReleaseFormat').lower() != 'album':
        return False
    if not isinstance(album.get('strAlbum'), str):
        return False
    return True


def get_albums():
    albums = Album.query.all()

    return albums


def get_albums_for_search(search_term):
    albums = Album.query.filter(Album.name.ilike(f"%{search_term}%")).all()[:10]
    return albums


