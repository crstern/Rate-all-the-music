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

genre_colors = ["#5f0f40ff", "#7d092fff","#9a031eff","#cb4721ff", "#fb8b24ff",
          "#ef781cff", "#e36414ff","#ae5e26ff", "#795838ff", "#0f4c5cff"]


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS