"""
Genre related data transfer object
"""
from flask_restx import Namespace, fields


_artist_basic = {
        'id': fields.Integer(description="Artist id"),
        'name': fields.String(description="Artist name"),
        'origin_country': fields.String(description="Artist origin country"),
        'image': fields.String(description="Image of the artist"),
    }


class GenreDto:
    """
    Genre data transfer object definitions
    """
    api = Namespace('genres', description='Genre related operations')

    genre_basic = api.model('Genre basic', {
        'id': fields.String(description='genre id'),
        'name': fields.String(description='Name of the genre'),
        'artists': fields.List(fields.Nested(_artist_basic, description="representative artists"))
    })
