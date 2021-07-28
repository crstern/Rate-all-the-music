"""
Album related endpoints
"""

from flask import request
from flask_restx import Resource

from apps.api.dto import AlbumDto
from apps.api.utils import (
    response_with,
    responses as resp,
    token_required,
    get_current_user,
    AuthError
)
from apps.api.services import (
    upload_albums
)

api = AlbumDto.api
_user_basic = AlbumDto.album_basic


@api.route('/upload')
class UploadCollection(Resource):
    """
    Collection for root - /upload - endpoints

    Args: Resource(Object)

    """
    @api.doc(
        'upload albums',
    )
    @token_required
    def post(self):
        user = get_current_user()

        if user.admin is not True:
            raise AuthError('This is possible only for admins', 403)

        upload_albums()

        return response_with(resp.SUCCESS_200)