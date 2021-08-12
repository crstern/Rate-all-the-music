"""
Utility methods definition
"""
# noinspection PyProtectedMember
import os

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

SECRET_KEY = os.environ['SECRET_KEY']

SECRET_REFRESH_KEY = os.environ['SECRET_REFRESH_KEY']

UPLOAD_FOLDER = os.environ['UPLOAD_FOLDER']

path_to_images = os.path.join(os.getcwd(), 'images')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS