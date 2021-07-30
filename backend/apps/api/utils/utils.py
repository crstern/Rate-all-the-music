"""
Utility methods definition
"""
# noinspection PyProtectedMember
import jwt
import os

from .exceptions import AuthError
from apps.api.models import User

from functools import wraps
from flask import (
    request,
    session,
)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

SECRET_KEY = os.environ['SECRET_KEY']

UPLOAD_FOLDER = os.environ['UPLOAD_FOLDER']

path_to_images = os.path.join(os.getcwd(), 'images')


def get_current_user():
    """
    A proxy for the current user. If no user is logged in, this will be an empty user.

    :return Request context user or None.
    """
    current_user = User.query.filter_by(id=session['user_id']).first()
    return current_user


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'x-access-token' not in request.headers:
            raise AuthError('Authorization header not found', 401)

        token = request.headers['x-access-token']

        if not token:
            raise AuthError('Token is missing', 401)

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms="HS256")
            current_user = User.query.filter_by(id=data['id']).first()
            session['user_id'] = current_user.id
        except Exception as e:
            print(e)
            raise AuthError('Authorization is invalid', 401)

        return f(*args, **kwargs)
    return decorated


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def check_if_user_is_admin():
    user = get_current_user()

    if user.admin is not True:
        raise AuthError('This is possible only for admins', 403)