import requests
import json
import os

from apps.api.models import (
    Artist,
    Image
)
from apps.extensions import db
from apps.api.utils import (
    ConflictError,
    path_to_images
)
from .genre_service import get_or_create_genre

import pandas as pd


def get_artist_names(file_path):
    df = pd.read_csv(file_path)
    df = df.drop(['facebook', 'twitter', 'genre', 'mtv', 'website'], axis=1)
    df = df.dropna() # drop missing values
    artists = df.name.to_list()
    return artists


def valid_response(resp_content):

    if not isinstance(resp_content, list):
        return False
    resp_content = resp_content[0]

    if 'strArtist' not in resp_content or 'idArtist' not in resp_content:
        return False

    validate_field(resp_content, 'strCountryCode')
    validate_field(resp_content, 'strBiographyEN')
    validate_field(resp_content, 'intFormedYear')
    validate_field(resp_content, 'intMembers')
    validate_field(resp_content, 'strLabel')
    validate_field(resp_content, 'strWebsite')
    validate_field(resp_content, 'strFacebook')

    if "strStyle" not in resp_content or resp_content["strStyle"] is None:
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
    for i in range(1, 4):
        file_paths.append(f'D:\\Coding\\Licenta\\10000-MTV-Music-Artists-page-{i}.csv')

    for file_index, file_path in enumerate(file_paths):
        artists = get_artist_names(file_path)

        for artist_index, artist in enumerate(artists):
            artist = artist[1:-1]
            req_link = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + artist
            if artist == 'Drake':
                return
            try:
                resp = requests.get(req_link)
                if resp.status_code != 200:
                    print(resp.status_code)
                    return
            except Exception as e:
                print(e)
                raise ConflictError("Error during request for artist")

            try:
                resp_content = json.loads(resp.content.decode("UTF-8"))['artists']

                if not valid_response(resp_content):
                    continue
                resp_content = resp_content[0]
            except Exception as e:
                print(e)
                raise ConflictError("Response content is not valid")

            add_new_artist(artist, artist_index, file_index, resp_content)


def add_new_artist(artist, artist_index, file_index, resp_content):
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
    image_obj = None

    if resp_content["strArtistThumb"] is not None:
        artist_image_link = resp_content["strArtistThumb"]

        try:
            resp = requests.get(artist_image_link)
            image_name = f'artist_{artist}_{file_index}{artist_index}.jpg'
            image_path = os.path.join(path_to_images, image_name)

            with open(image_path, 'wb') as f:
                f.write(resp.content)
                image_obj = Image(path=image_path)
                db.session.add(image_obj)
                db.session.commit()

        except Exception as e:
            print(e)
            image_obj = None
            print('image not saved')

    artist_genre = get_or_create_genre(resp_content["strStyle"])

    artist_dict = {
        "name": resp_content['strArtist'],
        "origin_country": resp_content['strCountryCode'],
        "description": resp_content['strBiographyEN'],
        "genre": artist_genre.id,
        "website": resp_content['strWebsite'],
        "facebook_link": resp_content['strFacebook'],
        "members": resp_content['intMembers'],
        "id": resp_content['idArtist']
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
        raise ConflictError("Error while saving the artist")


