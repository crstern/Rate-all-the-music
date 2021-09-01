"""
Genre related data transfer object
"""
from flask_restx import Namespace, fields


_artist_basic = {
    'id': fields.Integer(description="Artist id"),
    'name': fields.String(description="Artist name"),
    'origin_country': fields.String(description="Artist origin country"),
    'image': fields.String(description="Image of the artist"),
    'total_note': fields.Float(),
}

_album_basic = {
    'id': fields.Integer(description="Album id"),
    'name': fields.String(description="Album name"),
    'artist_id': fields.String(description="Album's artist id"),
    'image': fields.String(description="Image of the cover"),
    'artist': fields.Nested(_artist_basic),
    'total_note': fields.Float(),
}


class GenreDto:
    """
    Genre data transfer object definitions
    """
    api = Namespace('genres', description='Genre related operations')

    genre_basic = api.model('Genre basic', {
        'id': fields.String(description='genre id'),
        'name': fields.String(description='Name of the genre'),
        'artists': fields.List(fields.Nested(_artist_basic, description="representative artists")),
        'albums': fields.List(fields.Nested(_album_basic, description="representative albums")),
        'image': fields.String(description='Image of the genre'),

    })
