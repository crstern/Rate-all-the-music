from apps.api.models import (
    Rating,
    Album,
    Artist,
)
from apps.extensions import db
from .user_service import get_current_user
from apps.api.utils import (
    ServerError,
    InvalidPayload,
    NotFound
)
from .album_service import get_album_details_by_id
from .artist_service import get_artist_details_by_id
from .user_service import get_user_by_username


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

    return rating


def get_all_ratings_for_album(album_id):
    get_album_details_by_id(album_id)
    _count = db.func.count('users_that_like')
    ratings = db.session.query(Rating, _count).filter(
        Rating.album_id == album_id
    ).order_by(_count.desc()).all()

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

    if rating.album_id:
        rating.album = Album.query.get(rating.album_id)
    elif rating.artist_id:
        rating.artist = Artist.query.get(rating.artist_id)

    return rating


def delete_rating_by_id(rating_id):
    rating = get_rating_by_id(rating_id)

    try:
        db.session.delete(rating)
        db.session.commit()
    except Exception as e:
        print(e)
        raise ServerError("Couldn't remove the rating")


def update_rating_by_id(rating_id, data):
    rating = get_rating_by_id(rating_id)

    rating.number_of_stars = data.get("number_of_stars")
    rating.title = data.get("title")
    rating.description = data.get("description")

    try:
        db.session.commit()
    except Exception as e:
        print(e)
        raise ServerError("Couldn't update the rating")

    return rating


def update_like_rating(rating_id, data):
    rating = get_rating_by_id(rating_id)
    user = get_user_by_username(data.get('username'))

    rating.users_that_like.append(user)

    try:
        db.session.add(rating)
        db.session.commit()
    except Exception as e:
        print(e)
        raise ServerError("Couldn't update the rating")

    return rating


def update_unlike_rating(rating_id, data):
    rating = get_rating_by_id(rating_id)
    user = get_user_by_username(data.get('username'))

    rating.users_that_like.remove(user)

    try:
        db.session.add(rating)
        db.session.commit()
    except Exception as e:
        print(e)
        raise ServerError("Couldn't update the rating")

    return rating



