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


@api.route('/login')
class LoginCollection(Resource):
    """
    Collection for root - /login - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """

    @api.doc(
        'Register user')
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
            200: ('message', 'User was created')
        })
    def post(self):
        data = request.get_json()

        created = create_new_user(data)

        if created is True:
            return response_with(resp.SUCCESS_200, value={'message': 'Usr created'})
        else:
            return response_with(resp.INVALID_INPUT_422, value={'message': 'User was NOT created'})


@api.route('/protected')
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

