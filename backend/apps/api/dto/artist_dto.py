"""
Artist data transfer object
"""
from flask_restx import Namespace, fields
from .image_dto import ImageDto
from .genre_dto import GenreDto
from .album_dto import AlbumDto
from .rating_dto import RatingDto

_image_basic = ImageDto.image_basic
_genre_basic = GenreDto.genre_basic
_album_basic = AlbumDto.album_basic
_rating_basic = RatingDto.rating_basic


class ArtistDto:
    """
    Artist data transfer object definitions
    """
    api = Namespace('artists', description='Artist related operations')

    artist_details = api.model('Artist details', {
        'id': fields.Integer(description="Artist id"),
        'name': fields.String(description="Artist name"),
        'origin_country': fields.String(description="Artist origin country"),
        'image': fields.Nested(_image_basic, description="Image of the artist"),
        'description': fields.String(description="Artist description"),
        'genre': fields.Nested(_genre_basic, description="Artist main genre"),
        'formed_year': fields.Integer(description="When the artist formed"),
        'website': fields.String(description="Artist website"),
        'facebook_link': fields.String(description="Artist facebook page"),
        'albums': fields.Nested(_album_basic),
        'ratings': fields.Nested(_rating_basic)
    })

    artist_basic = api.model('Artist details', {
        'id': fields.Integer(description="Artist id"),
        'name': fields.String(description="Artist name"),
        'origin_country': fields.String(description="Artist origin country"),
        'image': fields.Nested(_image_basic, description="Image of the artist"),
    })
