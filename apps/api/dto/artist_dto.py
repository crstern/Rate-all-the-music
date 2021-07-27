"""
Artist data transfer object
"""
from flask_restx import Namespace, fields


class ArtistDto:
    """
    Artist data transfer object definitions
    """
    api = Namespace('artists', description='Artist related operations')
