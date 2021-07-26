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
    _request_ctx_stack,
    has_request_context,
    request,
    session,
    jsonify,
)

secret_key = os.environ['SECRET_KEY']


def get_current_user():
    """
    A proxy for the current user. If no user is logged in, this will be an empty user.

    :return Request context user or None.
    """
    current_user = User.query.filter_by(public_id=session['user_public_id']).first()
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
            data = jwt.decode(token, secret_key, algorithms="HS256")
            current_user = User.query.filter_by(public_id=data['public_id']).first()
            session['user_public_id'] = current_user.public_id
        except Exception as e:
            print(e)
            raise AuthError('Authorization is invalid', 401)

        return f(*args, **kwargs)
    return decorated
