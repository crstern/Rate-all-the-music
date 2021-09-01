"""
Profile related data transfer object
"""
from flask_restx import Namespace, fields
from .rating_dto import RatingDto
from .album_dto import AlbumDto

_rating_basic = RatingDto.rating_basic
_album_basic = AlbumDto.album_basic


class ProfileDto:
    """
    Profile data transfer object definitions
    """
    api = Namespace('profile', description='Profile related operations')

    profile_minimal = api.model('Profile minimal', {
        'id': fields.Integer(),
        'username': fields.String(description='User username')
    })

    profile_basic = api.model('Profile basic', {
        'username': fields.String(description='User username'),
        'ratings': fields.List(fields.Nested(_rating_basic)),
        # 'following': fields.List(fields.Nested(profile_minimal))
    })
