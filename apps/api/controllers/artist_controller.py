from apps.api.dto import ArtistDto
from apps.api.utils import (
    token_required,
    get_current_user,
    AuthError,
    responses as resp,
    response_with,

)
from apps.api.services import upload_artists
from flask_restx import Resource

api = ArtistDto.api


@api.route('/upload')
class UploadCollection(Resource):
    """
    Collection for root - /upload - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """

    @api.doc(
        'upload artists',
    )
    @token_required
    def post(self):
        user = get_current_user()

        if user.admin is not True:
            raise AuthError('This is possible only for admins', 403)

        upload_artists()

        return response_with(resp.SUCCESS_200)
