"""
Album related data transfer object
"""
from flask_restx import Namespace, fields

from .genre_dto import GenreDto
from .image_dto import ImageDto


_genre_basic = GenreDto.genre_basic
_image_basic = ImageDto.image_basic


class AlbumDto:
    """
    Album data transfer object definitions
    """
    api = Namespace('albums', description='Album related operations')

    album_details = api.model('Album basic', {
        'name': fields.String(description="Album name"),
        'artist_id': fields.String(description="Album's artist id"),
        'description': fields.String(description="Album description"),
        'genre': fields.Nested(_genre_basic, description="Album genre"),
        'release_year': fields.Integer(description="When the album was released"),
        'image': fields.Nested(_image_basic, description="Art cover of the album"),
    })

    album_basic = api.model('Album basic', {
        'name': fields.String(description="Album name"),
        'artist_id': fields.String(description="Album's artist id")
    })