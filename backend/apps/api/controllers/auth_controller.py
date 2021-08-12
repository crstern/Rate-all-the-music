"""
User related endpoints
"""
from flask import request, session
from flask_restx import Resource


from apps.api.dto import UserDto
from apps.api.services import (
    create_new_user,
    get_access_token,
    get_refresh_token,
    get_new_access_token
)
from apps.api.utils import (
    response_with,
    responses as resp,
)
from apps.api.services.user_service import get_current_user, token_required

api = UserDto.api
_user_basic = UserDto.user_basic
_user_advanced = UserDto.user_advanced
_user_login_validation = UserDto.user_login_validation
_user_register_validation = UserDto.user_register_validation
_user_login_info = UserDto.user_login_info
_new_access_token = UserDto.new_access_token


@api.route('/login')
class LoginCollection(Resource):
    """
    Collection for root - /login - endpoints

    Args: Resource(Object)

    Returns:
        json: token
    """

    @api.doc(
        'Login user',
        responses={
            200: ('data', _user_login_info)
        })
    @api.expect(_user_login_validation, validate=True)
    def post(self):
        data = request.get_json()
        access_token = get_access_token(data)
        refresh_token = get_refresh_token()
        user = get_current_user()
        data = {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': user,
        }
        data = api.marshal(data, _user_login_info)
        return response_with(resp.SUCCESS_200, value={
            'data': data
        })


@api.route('/register')
class RegisterCollection(Resource):
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
class UserCollection(Resource):
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


@api.route('/refresh_token')
class RefreshToken(Resource):
    """
    Collection for root - /refresh_token - endpoints

    Args: Resource(Object)

    Returns:
        json: data containing refreshed token
    """
    @api.doc(
        'Refresh access_token',
        responses={
            '200': _new_access_token
        }
    )
    def get(self):
        access_token_obj = {
            'access_token': get_new_access_token(request)
        }
        data = api.marshal(access_token_obj, _new_access_token)

        return response_with(resp.SUCCESS_200, value={'data': data})
