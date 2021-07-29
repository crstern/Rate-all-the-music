import os

import requests

from apps.extensions import db
from apps.api.models import Image
from apps.api.utils import path_to_images, NotFound


def extract_image(resp_content):
    """
    extracts and persists to db image of the artist
    :param resp_content:
    :return:
    """
    image_obj = None
    if resp_content["strArtistThumb"] is not None:
        artist_image_link = resp_content["strArtistThumb"]

        try:
            resp = requests.get(artist_image_link)
            image_name = f'artist_{resp_content.get("idArtist")}.jpg'
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
    return image_obj


def extract_art_cover(album):
    image_obj = None
    if album.get('strAlbumThumb'):
        image_path = os.path.join(path_to_images, f"album_{album.get('idAlbum')}.jpg")
        resp_image = requests.get(album.get('strAlbumThumb'))

        with open(image_path, 'wb') as f:
            f.write(resp_image.content)
            image_obj = Image(path=image_path)
            db.session.add(image_obj)
            db.session.commit()
    return image_obj


def delete_image_by_id(image_id):
    image = Image.query.get(image_id)

    if image is None:
        raise NotFound('Image not found')

    os.remove(image.path)

    db.session.delete(image)
    db.session.commit()

