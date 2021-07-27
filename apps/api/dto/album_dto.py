"""
Album related data transfer object
"""
from flask_restx import Namespace, fields


class AlbumDto:
    """
    Album data transfer object definitions
    """
    api = Namespace('albums', description='Album related operations')

    album_basic = api.model('Album basic', {
        'name': fields.String(description="Album name"),
        'artist_id': fields.String(description="Album's artist id"),

    })
