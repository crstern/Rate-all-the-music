"""
User related data transfer object
"""
from flask_restx import Namespace, fields


class UserDto:
    """
    User data transfer object definitions
    """
    api = Namespace('auth', description='User related operations')

    user_basic = api.model('User basic', {
        'username': fields.String(description='User username'),
        'id': fields.String(description='User public id'),
        'admin': fields.Boolean()
    })

    user_advanced = api.model('User basic', {
        'username': fields.String(description='User username'),
    })

    user_register_validation = api.model('User register validation', {
        'username': fields.String(description='User username', required=True),
        'password': fields.String(description='User password', required=True),
        'email':  fields.String(description='User password', required=True),
    })

    user_login_validation = api.model('User login validation', {
        'username': fields.String(description='User username', required=True),
        'password': fields.String(description='User password', required=True)
    })

    user_login_info = api.model('User logged in', {
        'access_token': fields.String(description='User jwt access token', read_only=True),
        'refresh_token': fields.String(description='User jwt refresh token', read_only=True),
        'user': fields.Nested(user_basic)
    })

    user_forgot_username = api.model('User email', {
        'email': fields.String(description='User mail', required=True)
    })

    new_access_token = api.model('New access token', {
        'access_token': fields.String(description='User jwt access token', read_only=True),
    })
