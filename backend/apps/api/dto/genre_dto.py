"""
Genre related data transfer object
"""
from flask_restx import Namespace, fields


class GenreDto:
    """
    Genre data transfer object definitions
    """
    api = Namespace('genres', description='Genre related operations')

    genre_basic = api.model('Genre basic', {
        'id': fields.String(description='genre id'),
        'name': fields.String(description='Name of the genre')
    })
