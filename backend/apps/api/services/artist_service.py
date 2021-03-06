import requests

from apps.api.models import (
    Artist,
    Genre,
)
from apps.api.utils import (
    NotFound,
    InvalidPayload,
    ServerError
)
from apps.extensions import db
from .album_service import fetch_albums_by_artist_id
from .image_service import (
    extract_artist_image,
    delete_image_by_id,
)
from .genre_service import get_or_create_genre


def get_artists_ids():
    """
    Returns list of all artist's ids
    :return: list of ids
    """
    result = Artist.query.all()
    result = [artist.id for artist in result]
    return result


def get_artists():
    artists = Artist.query.all()
    for artist in artists:
        artist.genre = Genre.query.get(artist.genre_id)
    return artists


def get_artist_details_by_id(artist_id):
    """
    returns an artist specified by its id
    :param artist_id:
    :return:
    """
    if not artist_id.isnumeric():
        raise InvalidPayload("Artist_id must be integer")
    artist = Artist.query.get(artist_id)
    if artist is None:
        raise NotFound("Artist not found")

    genre = Genre.query.get(artist.genre_id)
    artist.genre = genre

    for i, album in enumerate(artist.albums):
        album.genre = Genre.query.get(album.genre_id)

        artist.albums[i] = album

    return artist


def pull_new_artist(data):
    """
    pulls new artist to db from audio db
    :param data:
    :return:
    """
    if "artist_name" not in data:
        raise InvalidPayload("artist name is not in payload")
    artist_name = data.get('artist_name')

    if artist_name == "":
        raise InvalidPayload("Please insert an artist name")

    api_link = 'https://www.theaudiodb.com/api/v1/json/2/search.php?s='

    fetched_artist = requests.get(api_link + artist_name).json()

    if fetched_artist.get('artists') is None:
        raise InvalidPayload('This artist does not exist')

    fetched_artist = fetched_artist.get('artists')[0]

    if Artist.query.filter_by(id=fetched_artist.get('idArtist')).first() is not None:
        raise InvalidPayload("This artist already exists")

    artist_dict, image_obj, genre_obj = get_artist_details_from_fetched(fetched_artist)

    try:
        artist_obj = Artist(**artist_dict)
        db.session.add(artist_obj)
        db.session.commit()
        artist_obj.genre = genre_obj
    except Exception as e:
        print(e)
        raise ServerError('An error occurred when persisting to database')

    fetch_albums_by_artist_id(artist_obj.id)
    return artist_obj


def delete_artist_by_id(artist_id):
    """
    delete artist by id
    :param artist_id:
    :return: None
    """
    try:
        artist = get_artist_details_by_id(artist_id)
        delete_image_by_id(artist.image_id)
        db.session.delete(artist)
        db.session.commit()
    except Exception as e:
        print(e)
        raise ServerError('Error while deleting artist')


def get_artist_details_from_fetched(fetched_artist):
    """
    returns artist details from fetched artist from audio db
    :param fetched_artist:
    :return:
    """
    image_obj = extract_artist_image(fetched_artist)
    if fetched_artist.get('strGenre') is None or fetched_artist.get('strGenre') == "":
        fetched_artist["strGenre"] = "UNKNOWN"
    genre_obj = get_or_create_genre(fetched_artist.get("strGenre"))

    artist_dict = {
        'name': fetched_artist.get('strArtist'),
        "origin_country": fetched_artist.get('strCountryCode'),
        "description": fetched_artist.get('strBiographyEN'),
        "genre_id": genre_obj.id,
        "website": fetched_artist.get('strWebsite'),
        "facebook_link": fetched_artist.get('strFacebook'),
        "members": fetched_artist.get('intMembers'),
        "id": fetched_artist.get('idArtist'),
        "formed_year": fetched_artist.get('intFormedYear'),
        "record_label": fetched_artist.get('strLabel'),
        "image": image_obj,
        "total_note": 0,
    }

    return artist_dict, image_obj, genre_obj


def get_artists_for_search(search_term):
    artists = Artist.query.filter(Artist.name.ilike(f"%{search_term}%")).all()[:10]

    for artist in artists:
        artist.genre = Genre.query.get(artist.genre_id)

    return artists







