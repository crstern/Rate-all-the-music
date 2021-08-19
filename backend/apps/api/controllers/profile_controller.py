from flask import request
from flask_restx import Resource

from apps.api.dto import ProfileDto
from apps.api.utils import (
    response_with,
    responses as resp,
)
from apps.api.services import (
    get_user_by_username,
)

api = ProfileDto.api
_profile_basic = ProfileDto.profile_basic


@api.route('/<username>')
class ProfileCollection(Resource):
    """
    Collection for root - /login - endpoints

    Args: Resource(Object)

    Returns:
        json: token
    """

    @api.doc(
        'Get Profile',
        responses={
            200: ('data', _profile_basic),
            404: "User not found"
        }
    )
    def get(self, username):
        user = get_user_by_username(username)

        data = api.marshal(user, _profile_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})

