import os
import requests
import cv2
import numpy as np

from apps.api.utils import (
    path_to_images,

)


def extract_artist_image(artist):
    """
    extracts and persists to db image of the artist
    :param artist:
    :return:
    """
    image_obj = None
    if artist["strArtistThumb"] is not None:
        artist_image_link = artist["strArtistThumb"]

        try:
            image_name = f'{artist.get("idArtist")}_artist.jpg'
            resp = requests.get(artist_image_link)
            resize_write_image(image_name, resp)

            image_obj = image_name
        except Exception as e:
            print(e)
    return image_obj



def resize_write_image(image_name, resp):
    image_path = os.path.join(path_to_images, image_name)
    jpg_as_np = np.frombuffer(resp.content, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, flags=1)
    dim = (350, 350)
    img_resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
    cv2.imwrite(image_path, img_resized)
    return image_path


def extract_art_cover(album):
    image_obj = None
    if album.get('strAlbumThumb'):
        image_name = f'{album.get("idAlbum")}_album.jpg'
        resp = requests.get(album.get('strAlbumThumb'))
        resize_write_image(image_name, resp)
        image_obj = image_name

    return image_obj


def delete_image_by_id(filename):
    path = os.path.join(path_to_images, filename)
    os.remove(path)




def get_image_file_by_id(image_id):
    image = get_image_by_id(image_id)


