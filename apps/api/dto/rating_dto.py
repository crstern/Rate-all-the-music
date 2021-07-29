"""
Rating data transfer object
"""
from flask_restx import Namespace, fields
from .comment_dto import CommentDto

_comment_basic = CommentDto.comment_basic


class RatingDto:
    """
    Rating data transfer object model
    """
    api = Namespace('rating', description="rating dto")

    rating_basic = api.model('rating basic', {
        "number_of_stars": fields.Integer(description="Stars"),
        "title": fields.String(description=""),
        "description": fields.String(description=""),
        "artist_id": fields.Integer(description="Artist for rating"),
        "album_id": fields.Integer(description="Album for rating"),
        "comments": fields.List(fields.Nested(_comment_basic))
    })