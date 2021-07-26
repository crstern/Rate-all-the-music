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
        'token': fields.String(description='User jwt token', read_only=True)
    })
