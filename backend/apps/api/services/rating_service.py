from apps.api.models import Rating
from apps.extensions import db
from .user_service import get_current_user
from apps.api.utils import (
    ServerError,
    InvalidPayload,
    NotFound
)
from .album_service import get_album_details_by_id
from .artist_service import get_artist_details_by_id


def add_new_rating(item_id, data, item_type):
    if data is None:
        raise InvalidPayload("Data is none")

    if data == {}:
        raise InvalidPayload("Data is empty")

    user = get_current_user()
    if user is None:
        raise ServerError('Error, no user found', 404)

    rating = Rating(**data)
    if item_type == 'album':
        rating.album_id = item_id
    else:
        rating.artist_id = item_id
    rating.user_id = user.id

    try:
        db.session.add(rating)
        db.session.commit()
    except Exception as e:
        print(e)
        raise ServerError('Error while persisting to database')

    return True


def get_all_ratings_for_album(album_id):
    get_album_details_by_id(album_id)

    ratings = Rating.query.filter(
        Rating.album_id == album_id
    ).all()

    return ratings


def get_all_ratings_for_artist(artist_id):
    get_artist_details_by_id(artist_id)

    ratings = Rating.query.filter(
        Rating.artist_id == artist_id
    ).all()

    return ratings


def get_rating_by_id(rating_id):
    rating = Rating.query.get(rating_id)
    if rating is None:
        raise NotFound("Rating does not exist")

    return rating


def delete_rating_by_id(rating_id):
    rating = get_rating_by_id(rating_id)

    try:
        db.session.delete(rating)
        db.session.commit()
    except Exception as e:
        print(e)
        raise ServerError("Couldn't remove the rating")

    if rating.artist_id:
        ratings = get_all_ratings_for_artist(str(rating.artist_id))
    else:
        ratings = get_all_ratings_for_album(str(rating.album_id))
    return ratings


def update_rating_by_id(rating_id, data):
    rating = get_rating_by_id(rating_id)

    rating.number_of_stars = data.get("number_of_stars")
    rating.title = data.get("title")
    rating.description = data.get("description")

    try:
        db.session.add(rating)
        db.session.commit()
    except Exception as e:
        print(e)
        raise ServerError("Couldn't update the rating")

    if rating.artist_id:
        ratings = get_all_ratings_for_album(str(rating.artist_id))
    else:
        ratings = get_all_ratings_for_album(str(rating.album_id))
    return ratings
