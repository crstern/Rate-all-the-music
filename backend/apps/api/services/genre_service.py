from apps.api.models import Genre, Image
from apps.extensions import db


def get_or_create_genre(name):
    """
    checks if the genre exist, if so, it returns the genre object
    else creates a new one with the name specified as parameter
    :param name:
    :return: genre
    """
    existing_genre = Genre.query.filter_by(name=name).first()
    if existing_genre is not None:
        return existing_genre
    try:
        genre_obj = Genre(name=name)
        db.session.add(genre_obj)
        db.session.commit()
    except Exception as e:
        print(e)
        return None
    return genre_obj


def get_all_genres():
    genres = Genre.query.all()
    for genre in genres:
        for artist in genre.artists:
            if artist.image_id:
                artist.image = Image.query.get(artist.image_id)
    return genres
