"""
Album related endpoints
"""

from flask_restx import Resource
from apps.extensions import pagination

from apps.api.dto import AlbumDto
from apps.api.utils import (
    response_with,
    responses as resp,
    AuthError
)
from apps.api.services.user_service import get_current_user, token_required, check_if_user_is_admin
from apps.api.services import (
    upload_albums,
    get_albums,
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
        check_if_user_is_admin()

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
        'get albums album',
        responses={
            200: ("data", _album_basic)
        }
    )
    def get(self):
        return pagination.paginate(get_albums(), _album_basic)

    


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