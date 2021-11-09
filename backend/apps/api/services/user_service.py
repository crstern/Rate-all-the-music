import datetime
from functools import wraps

import jwt

from werkzeug.security import generate_password_hash, check_password_hash
from flask import session, request
from flask_mail import Message

from apps.api.models import (
    User,
    Rating,
    Album,
    Artist,
)
from apps.extensions import db, mail
from apps.api.utils import AuthError, SECRET_KEY, SECRET_REFRESH_KEY, NotFound


def create_new_user(data):
    """
    Function that creates a new user

    :param data: user related data
    :return: True if the operation was successful, else false
    """
    new_user = User(**data)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print(e)
        return None
    return new_user


def get_current_user():
    """
    A proxy for the current user. If no user is logged in, this will be an empty user.

    :return Request context user or None.
    """
    current_user = User.query.filter_by(id=session.get('user_id')).first()
    return current_user


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'x-access-token' not in request.headers:
            raise AuthError('Authorization header not found', 401)

        token = request.headers['x-access-token']

        if token is None or token == "":
            raise AuthError('Token is missing', 402)

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms="HS256")
            current_user = User.query.filter_by(id=data['id']).first()
            session['user_id'] = current_user.id
        except Exception as e:
            print(e)
            raise AuthError('Authorization is invalid', 403)

        return f(*args, **kwargs)
    return decorated


def check_if_user_is_admin():
    user = get_current_user()

    if user.admin is not True:
        raise AuthError('This is possible only for admins', 403)


def send_username(data):
    user = User.query.filter_by(email=data.get('email')).first()
    if user is None:
        raise NotFound("User not found")
    msg = Message('Your username', sender="mdatabase0@gmail.com", recipients=[user.email])
    msg.body = f"""
    Hello!
    
    Your username is {user.username}.
    
    Have a nice day!
    """

    mail.send(msg)


def get_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        raise NotFound("User not found")
    user.ratings = Rating.query.filter(
        Rating.username == user.username
    ).order_by(Rating.created_at).all()

    for rating in user.ratings:
        if rating.album_id:
            rating.album = Album.query.get(rating.album_id)
        elif rating.artist_id:
            rating.artist = Artist.query.get(rating.artist_id)
    return user



