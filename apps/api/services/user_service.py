import os
import uuid
import datetime
import jwt

from flask import session
from werkzeug.security import generate_password_hash, check_password_hash
from apps.api.models import User
from apps.extensions import db
from apps.api.utils import AuthError, secret_key


def create_new_user(data):
    """
    Function that creates a new user

    :param data: user related data
    :return: True if the operation was successful, else false
    """
    hashed_password = generate_password_hash(data['password'], method='sha256')
    data['hashed_password'] = hashed_password
    data['public_id'] = str(uuid.uuid4())
    del data['password']
    new_user = User(**data)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print(e)
        return False
    return True


def get_access_token(data):
    if not data or 'username' not in data or 'password' not in data:
        raise AuthError('Username or password not provided')
    user = User.query.filter_by(username=data['username']).first()

    if not user:
        raise AuthError('Username does not exist', 404)

    if check_password_hash(user.hashed_password, data['password']):
        token = jwt.encode({
            'public_id': user.public_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, secret_key)
        session['public_id'] = user.public_id
        return token
    else:
        raise AuthError("Incorect password", 401)