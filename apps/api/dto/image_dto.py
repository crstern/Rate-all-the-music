"""
Image related data transfer object
"""
from flask_restx import Namespace, fields
from werkzeug.datastructures import FileStorage


class ImageDto:
    """
    Image data transfer object definitions
    """
    api = Namespace('images', description='Image related operations')

    image_basic = api.model('Image basic', {
        'id': fields.String(description='Image id'),
        'path': fields.String(description='Image path')
    })

    upload_parser = api.parser()
    upload_parser.add_argument('file', location='images', type=FileStorage, required=True)
