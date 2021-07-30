"""
Comment data transfer object
"""
from flask_restx import Namespace, fields


class CommentDto:
    """
    Comment data transfer object model
    """
    api = Namespace('comment', description="comment dto")

    comment_basic = api.model('Comment basic', {
        "content": fields.String(),
        "rating_id": fields.Integer(),
        "user_id": fields.Integer()
    })
