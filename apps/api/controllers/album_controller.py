"""
Album related endpoints
"""

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
    upload_albums,
    get_album_details_by_id
)

api = AlbumDto.api
_album_basic = AlbumDto.album_basic
_album_details = AlbumDto.album_details


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


@api.route('/')
class AlbumCollection(Resource):
    """
    Collection for root - / - endpoints
    Args: Resource(Object)

    Returns:
        json: data
    """
    @api.doc(
        'upload new album',
        responses={
            200: ("data", _album_details)
        }
    )
    def post(self):
        pass
    
    


@api.route('/<album_id>')
class AlbumByIdCollection(Resource):
    """
    Collection for root - /<album_id> - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """
    @api.doc(
        'get album by id',
        responses={
            200: ("data", _album_details)
        }
    )
    def get(self, album_id):
        album = get_album_details_by_id(album_id)

        data = api.marshal(album, _album_details)
        return response_with(resp.SUCCESS_200, value={'data': data})