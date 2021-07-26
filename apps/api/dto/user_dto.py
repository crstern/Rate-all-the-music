"""
User related data transfer object
"""
from flask_restx import Namespace, fields


class UserDto:
    """
    User data transfer object definitions
    """
    api = Namespace('users', description='User related operations')

    user_basic = api.model('User basic', {
        'username': fields.String(description='User username'),
        'public_id': fields.String(description='User public id')
    })

    user_advanced = api.model('User basic', {
        'username': fields.String(description='User username'),
        'hashed_password': fields.String(description='User password')
    })
