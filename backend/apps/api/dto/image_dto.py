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