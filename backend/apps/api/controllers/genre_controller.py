from flask_restx import Resource
from flask import request
from apps.api.utils import (
    responses as resp,
    response_with,
)
from apps.api.services import get_all_genres

from apps.api.dto import GenreDto

api = GenreDto.api

_genre_basic = GenreDto.genre_basic


@api.route('/')
class AllGenresCollection(Resource):
    """
    Collection for root - / - endpoints

    Args: Resource(Object)

    Returns:
        code: 200 if succeeded
        json: data
    """
    @api.doc(
        'list of genres',
        responses={
            200: ('data', _genre_basic)
        }
    )
    def get(self):
        """
        Returns a list with all genres
        """
        genres = get_all_genres()
        data = api.marshal(genres, _genre_basic)

        return response_with(resp.SUCCESS_200, value={'data': data})