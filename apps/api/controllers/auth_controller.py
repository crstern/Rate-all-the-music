"""
User related endpoints
"""
from flask import request, session
from flask_restx import Resource

from apps.api.dto import UserDto
from apps.api.services import (
    create_new_user,
    get_access_token
)
from apps.api.utils import (
    response_with,
    responses as resp,
    token_required,
    get_current_user
)


api = UserDto.api
_user_basic = UserDto.user_basic
_user_advanced = UserDto.user_advanced
_user_login_validation = UserDto.user_login_validation
_user_register_validation = UserDto.user_register_validation
_user_login_info = UserDto.user_login_info


@api.route('/login')
class LoginCollection(Resource):
    """
    Collection for root - /login - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """

    @api.doc(
        'Login user',
        responses={
            200: ('token', _user_login_info)
        })
    @api.expect(_user_login_validation, validate=True)
    def post(self):
        data = request.get_json()

        token = get_access_token(data)

        return response_with(resp.SUCCESS_200, value={'token': token})


@api.route('/register')
class LoginCollection(Resource):
    """
    Collection for root - /register - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """
    @api.doc(
        'Register user',
        responses={
            200: ('data', _user_basic)
        })
    @api.expect(_user_register_validation, validate=True)
    def post(self):
        data = request.get_json()

        created = create_new_user(data)

        data = api.marshal(created, _user_basic)

        if created is not None:
            return response_with(resp.SUCCESS_200, value={'data': data})
        else:
            return response_with(resp.INVALID_INPUT_422, value={'message': 'User was NOT created'})


@api.route('/get_current_user')
class LoginCollection(Resource):
    """
    Collection for root - /protected - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """

    @api.doc(
        'test authorization',
        responses={
            200: ('data', _user_basic)
        }
    )
    @token_required
    def get(self):
        user = get_current_user()

        data = api.marshal(user, _user_basic)

        return response_with(resp.SUCCESS_200, value={'data': data})

