from apps.api.services import (
    token_required,
    add_new_rating,
    get_all_ratings_for_album,
    update_like_rating,
    update_unlike_rating,
    delete_rating_by_id,
    update_rating_by_id,
)
from apps.api.utils import (
    responses as resp,
    response_with,
)
from apps.api.dto import RatingDto
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
        rating = add_new_rating(album_id, data, "album")
        data = api.marshal(rating, _rating_basic)

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

        rating = add_new_rating(artist_id, data, "artist")
        data = api.marshal(rating, _rating_basic)

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
            200: 'success',
            404: 'not found'
        }
    )
    @token_required
    def delete(self, rating_id):
        """
        Returns success
        """
        delete_rating_by_id(rating_id)

        return response_with(resp.SUCCESS_200)

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
        Returns updated rating
        """
        data = request.get_json()
        rating = update_rating_by_id(rating_id, data)

        data = api.marshal(rating, _rating_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})


@api.route('/like/<rating_id>')
class LikeRating(Resource):
    @api.doc('Like rating',
             responses={
                 200: _rating_basic,
                 404: 'not found'
             })
    @token_required
    def put(self, rating_id):
        """
        Returns updated rating
        """
        data = request.get_json()
        rating = update_like_rating(rating_id, data)

        data = api.marshal(rating, _rating_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})


@api.route('/unlike/<rating_id>')
class LikeRating(Resource):
    @api.doc('Unlike rating',
             responses={
                 200: _rating_basic,
                 404: 'not found'
             })
    @token_required
    def put(self, rating_id):
        """
        Returns updated rating
        """
        data = request.get_json()
        rating = update_unlike_rating(rating_id, data)

        data = api.marshal(rating, _rating_basic)
        return response_with(resp.SUCCESS_200, value={'data': data})