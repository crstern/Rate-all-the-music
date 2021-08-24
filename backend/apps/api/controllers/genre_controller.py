from flask_restx import Resource
from flask import request
from apps.api.utils import (
    responses as resp,
    response_with,
)
from apps.api.services import (
    get_all_genres,
    get_genre_by_name,
    get_genres_for_search
)

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


@api.route('/<genre_name>')
class GenreByNameCollection(Resource):
    api.doc(
        'get genre by name',
        responses={
            200: ('data', _genre_basic),
            404: "Not found"
        }
    )
    def get(self, genre_name):
        """
        Returns genre object by name
        """
        genre = get_genre_by_name(genre_name)
        data = api.marshal(genre, _genre_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})


@api.route('/search/<search_term>')
class SearchGenreCollection(Resource):
    @api.doc('Search genre',
             responses={
                 200: ('data', _genre_basic)
             })
    def get(self, search_term):
        artists = get_genres_for_search(search_term)
        data = api.marshal(artists, _genre_basic)

        return response_with(resp.SUCCESS_200, value={'data': data})