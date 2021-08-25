from apps.api.services.artist_service import delete_artist_by_id
from apps.extensions import pagination
from apps.api.dto import ArtistDto
from apps.api.utils import (
    responses as resp,
    response_with,
)
from apps.api.services.user_service import token_required, check_if_user_is_admin
from apps.api.services import (
    upload_artists,
    get_artist_details_by_id,
    pull_new_artist,
    upload_albums,
    get_artists,
    get_artists_for_search
)
from flask_restx import Resource
from flask import request

api = ArtistDto.api
_artist_details = ArtistDto.artist_details
_artist_basic = ArtistDto.artist_basic


@api.route('/upload')
class UploadCollection(Resource):
    """
    Collection for root - /upload - endpoints

    Args: Resource(Object)

    Returns:
        code: 200 if succeeded
    """

    @api.doc(
        'upload artists',
    )
    @token_required
    def post(self):
        check_if_user_is_admin()

        upload_artists()
        upload_albums()

        return response_with(resp.SUCCESS_200)


@api.route('/<artist_id>')
class ArtistByIdCollection(Resource):
    """
    Collection for root - /<artist_id> - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """
    @api.doc(
        'get artist by id',
        responses={
            200: ('data', _artist_details)
        }
    )
    def get(self, artist_id):
        """
        Returns details about an artist
        :param artist_id:
        :return: Artist
        """
        artist = get_artist_details_by_id(artist_id)

        data = api.marshal(artist, _artist_details)
        return response_with(resp.SUCCESS_200, value={'data': data})

    @api.doc(
        'delete artist by id'
    )
    @token_required
    def delete(self, artist_id):
        """
        Returns details about an artist
        :param artist_id:
        :return: Artist
        """
        check_if_user_is_admin()

        delete_artist_by_id(artist_id)

        return response_with(resp.SUCCESS_201)


@api.route('/')
class ArtistCollection(Resource):
    """
    Collection for root - /<artist_id> - endpoints

    Args: Resource(Object)

    Returns:
        json: data
    """
    @api.doc(
        'Add a new artist manually',
        responses={
            200: ('data', _artist_details),
            404: "Not found",
            400: "message"
        }
    )
    @token_required
    def post(self):
        data = request.get_json()

        artist = pull_new_artist(data)
        data = api.marshal(artist, _artist_details)
        return response_with(resp.SUCCESS_200, value={'data': data})

    @api.doc(
        'Retunrs a page with 10 artists',
        responses={
            200: ('data', _artist_basic)
        }
    )
    def get(self):
        return pagination.paginate(get_artists(), _artist_basic)


@api.route('/search/<search_term>')
class SearchArtistCollection(Resource):
    @api.doc('Search artist',
             responses={
                 200: ('data', _artist_basic)
             })
    def get(self, search_term):
        artists = get_artists_for_search(search_term)
        data = api.marshal(artists, _artist_basic)

        return response_with(resp.SUCCESS_200, value={'data': data})
