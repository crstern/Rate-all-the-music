"""
Rating data transfer object
"""
from flask_restx import Namespace, fields


class RatingDto:
    """
    Rating data transfer object model
    """
    api = Namespace('ratings', description="rating dto")

    _profile_minimal = {
        'username': fields.String(description='User username'),
    }

    item_minimal = {
        "id": fields.Integer(),
        "name": fields.String(description="Artist/Album name"),
        "image": fields.String(description="Artist/Album image filename")
    }

    rating_basic = api.model('rating basic', {
        "id": fields.Integer(description="ID"),
        "number_of_stars": fields.Integer(description="Stars"),
        "title": fields.String(description=""),
        "description": fields.String(description=""),
        "artist_id": fields.Integer(description="Artist for rating"),
        "artist": fields.Nested(item_minimal, description="artist minimal details"),
        "album_id": fields.Integer(description="Album for rating"),
        "album": fields.Nested(item_minimal, description="album minimal details"),
        "username": fields.String(description="Username of the author"),
        "users_that_like": fields.List(fields.Nested(_profile_minimal), description="Users that appreciate the post"),
        "number_of_likes": fields.Integer(description="Number of likes")
    })

    rating_validation = api.model('rating album', {
        "number_of_stars": fields.Integer(description="Stars", required=True),
        "title": fields.String(description="rating title"),
        "description": fields.String(description="rating description"),
    })