import requests
import json
import os

from apps.api.models import (
    Artist,
)
from apps.extensions import db
from apps.api.utils import (
    ConflictError,
    path_to_images
)
from .album_service import fetch_albums_by_artist_id
from .genre_service import get_or_create_genre
from .artist_service import get_artists_ids

import pandas as pd

from .image_service import extract_artist_image


def get_artist_names(file_path):
    df = pd.read_csv(file_path)
    df = df.drop(['facebook', 'twitter', 'genre', 'mtv', 'website'], axis=1)
    df = df.dropna() # drop missing values
    artists = df.name.to_list()
    return artists


def validate_artist(resp_content):

    if not isinstance(resp_content, list):
        return False
    resp_content = resp_content[0]

    if 'strArtist' not in resp_content or 'idArtist' not in resp_content:
        return False

    if Artist.query.filter_by(id=resp_content.get('idArtist')).first() is not None:
        return False

    validate_field(resp_content, 'strCountryCode')
    validate_field(resp_content, 'strBiographyEN')
    validate_field(resp_content, 'intFormedYear')
    validate_field(resp_content, 'intMembers')
    validate_field(resp_content, 'strLabel')
    validate_field(resp_content, 'strWebsite')
    validate_field(resp_content, 'strFacebook')

    if resp_content.get('strStyle') is None:
        resp_content["strStyle"] = "UNKNOWN"

    return True


def validate_field(resp_content, field_name):
    if field_name not in resp_content:
        resp_content[field_name] = None


def upload_artists():
    """
    Gets the artist names from 10000-MTV-Music-Artists-page-1/2/3.csv
    Gets the artist details via www.theaudiodb.com/api
    Adds artist details with image, and genre to db
    :return:
    """
    file_paths = []
    artist_ids = get_artists_ids()
    for i in range(1, 4):
        file_paths.append(os.path.join(os.path.abspath('.'), f'10000-MTV-Music-Artists-page-{i}.csv'))

    for file_index, file_path in enumerate(file_paths):
        artists = get_artist_names(file_path)

        for artist_index, artist in enumerate(artists):
            if artist_index == 50:
                return
            artist = artist[1:-1]
            req_link = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + artist
            resp = requests.get(req_link)

            try:
                resp_content = json.loads(resp.content.decode("UTF-8"))['artists']

                if not validate_artist(resp_content):
                    continue

                resp_content = resp_content[0]
                if resp_content.get("idArtist") in artist_ids:
                    continue
            except Exception as e:
                print(e)
                raise ConflictError("Response content is not valid")

            add_new_artist(artist, resp_content)


def add_new_artist(artist, resp_content):
    """
    checks if artist can have an image attached,
    adds an image to db if so,
    maps genre to an object,
    adds artist to db
    :param artist: artist name
    :param artist_index:
    :param file_index:
    :param resp_content: response from audio db
    :return:
    """
    image_obj = extract_artist_image(resp_content)

    artist_genre = get_or_create_genre(resp_content.get("strStyle"))

    artist_dict = {
        "name": resp_content.get('strArtist'),
        "origin_country": resp_content.get('strCountryCode'),
        "description": resp_content.get('strBiographyEN'),
        "genre_id": artist_genre.id,
        "website": resp_content.get('strWebsite'),
        "facebook_link": resp_content.get('strFacebook'),
        "members": resp_content.get('intMembers'),
        "id": resp_content.get('idArtist'),
        "formed_year": resp_content.get('intFormedYear'),
        "record_label": resp_content.get('strLabel')
    }

    if image_obj is not None:
        artist_dict['image_id'] = image_obj.id
    try:
        artist_obj = Artist(**artist_dict)
        db.session.add(artist_obj)
        db.session.commit()
        print('Successfully added', artist)
    except Exception as e:
        print(e)


def upload_albums():
    artist_ids = get_artists_ids()

    for artist_id in artist_ids:
        fetch_albums_by_artist_id(artist_id)


