"""
Album related data transfer object
"""
from flask_restx import Namespace, fields

from .genre_dto import GenreDto
from .image_dto import ImageDto
from .rating_dto import RatingDto


_genre_basic = GenreDto.genre_basic
_artist_basic = {
    'id': fields.Integer(description="Artist id"),
    'name': fields.String(description="Artist name"),
    'origin_country': fields.String(description="Artist origin country"),
    'image': fields.String(description="Image of the artist"),
}
_rating_basic = RatingDto.rating_basic


class AlbumDto:
    """
    Album data transfer object definitions
    """
    api = Namespace('albums', description='Album related operations')

    album_basic = api.model('Album basic', {
        'id': fields.Integer(description="Album id"),
        'name': fields.String(description="Album name"),
        'artist_id': fields.String(description="Album's artist id"),
        'image': fields.String(description="Image of the cover"),
        'artist': fields.Nested(_artist_basic),
    })

    album_details = api.model('Album basic', {
        'id': fields.Integer(description="Album id"),
        'name': fields.String(description="Album name"),
        'artist_id': fields.String(description="Album's artist id"),
        'description': fields.String(description="Album description"),
        'genre': fields.Nested(_genre_basic, description="Album genre"),
        'release_year': fields.Integer(description="When the album was released"),
        'image': fields.String(description="Image of the cover"),
        'ratings': fields.Nested(_rating_basic),
        'artist': fields.Nested(_artist_basic),
        'other_albums': fields.Nested(album_basic)
    })

