"""
Flask app initialization
"""
from flask_restx import Api
from flask import Blueprint

from apps.api.controllers import user_ns


blueprint = Blueprint('api', __name__, url_prefix='/api')

api = Api(
    blueprint,
    version='1.0',
    title='IMDB API',
    description='IMDB API',
    contact='Cristian Stern',
    doc='/docs'
)

api.add_namespace(user_ns)
