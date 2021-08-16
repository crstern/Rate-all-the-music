from apps.api.dto import RatingDto
from apps.api.services import (
    token_required,
    add_new_rating,
    get_all_ratings_for_album,
    get_all_ratings_for_artist,
    delete_rating_by_id,
    update_rating_by_id
)
from apps.api.utils import (
    responses as resp,
    response_with,
)

from flask_restx import Resource
from flask import request


api = RatingDto.api
_rating_basic = RatingDto.rating_basic
_rating_valid = RatingDto.rating_validation


@api.route('/album/<album_id>')
class AlbumRatingCollection(Resource):
    """
    Collection from album rating endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """
    @api.doc(
        'Add album rating',
        responses={
            200: ('data', _rating_basic),
            400: "invalid payload"
        }
    )
    # @api.expect(_rating_valid, validate=True)
    @token_required
    def post(self, album_id):
        """
        Adds new rating for an album
        RETURNS ALL RATINGS FOR THAT ALBUM
        """
        data = request.get_json()
        add_new_rating(album_id, data, "album")

        ratings = get_all_ratings_for_album(album_id)
        data = api.marshal(ratings, _rating_basic)

        return response_with(resp.SUCCESS_200, value={'data': data})

    @api.doc(
        'Get all ratings for an album',
        responses={
            200: ('data', _rating_basic)
        }
    )
    def get(self, album_id):
        ratings = get_all_ratings_for_album(album_id)

        data = api.marshal(ratings, _rating_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})


@api.route('/artist/<artist_id>')
class ArtistRatingCollection(Resource):
    """
    Collection from artist rating endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """

    @api.doc(
        'Add artist rating',
        responses={
            200: ('data', _rating_basic)
        }
    )
    @api.expect(_rating_valid, validate=True)
    @token_required
    def post(self, artist_id):
        """
        Adds new rating for an artist
        """
        data = request.get_json()

        add_new_rating(artist_id, data, "artist")
        ratings = get_all_ratings_for_artist(artist_id)
        data = api.marshal(ratings, _rating_basic)

        return response_with(resp.SUCCESS_200, value={'data': data})

    @api.doc(
        'Get all ratings for an artist',
        responses={
            200: ('data', _rating_basic)
        }
    )
    def get(self, artist_id):
        ratings = get_all_ratings_for_album(artist_id)

        data = api.marshal(ratings, _rating_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})


@api.route('/<rating_id>')
class RatingByIdCollection(Resource):
    @api.doc(
        'Delete rating by id',
        responses={
            200: ('data', _rating_basic),
            404: 'not found'
        }
    )
    @token_required
    def delete(self, rating_id):
        """
        Returns all the ratings that remained for that item
        """
        ratings = delete_rating_by_id(rating_id)

        data = api.marshal(ratings, _rating_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})

    @api.doc(
        'Update rating by id',
        responses={
            200: ('data', _rating_basic),
            404: 'not found'
        }
    )
    @token_required
    def put(self, rating_id):
        """
        Returns all the ratings that remained for that item
        """
        data = request.get_json()
        ratings = update_rating_by_id(rating_id, data)

        data = api.marshal(ratings, _rating_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})

