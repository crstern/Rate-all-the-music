from flask_restx import Namespace, fields


class LikeDto():
    """
    Like data transfer object model
    """
    api = Namespace('like', description='like dto')

    like_basic = api.model('Like basic', {
        "rating_id": fields.Integer(),
        "user_id": fields.Integer()
    })

