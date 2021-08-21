"""
Image related endpoints
"""
from flask_restx import Resource
from flask import send_from_directory

from apps.api.dto import ImageDto
from apps.api.utils import (
    path_to_images
)

api = ImageDto.api


@api.route('/<filename>')
class SingleImageCollection(Resource):
    """
    Collection for root - /image/<image_id> - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """
    @api.doc(
        'Get image by id'
    )
    def get(self, filename):
        return send_from_directory(path_to_images, filename)




