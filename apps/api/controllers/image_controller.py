"""
Image related endpoints
"""
import os

from flask import request, flash
from flask_restx import Resource
from werkzeug.utils import secure_filename


from apps.api.dto import ImageDto
from apps.api.utils import (
    InvalidPayload,
    allowed_file,
    UPLOAD_FOLDER,
    responses as resp,
    response_with,
    token_required
)

api = ImageDto.api
_image_basic = ImageDto.image_basic
_upload_parser = ImageDto.upload_parser


@api.route('/upload')
class ImageUploadRoute(Resource):
    """
    Collection for root - /upload - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """
    @api.doc(
        'Upload image',
    )
    @token_required
    def post(self):
        file = request.files['file']
        print("yes")
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return response_with(resp.SUCCESS_200)
        raise InvalidPayload('This file type is not allowed')
