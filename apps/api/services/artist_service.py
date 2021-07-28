from apps.api.models import Artist


def get_artists_ids():
    """
    Returns list of all artist's ids
    :return: list of ids
    """
    result = Artist.query.all()
    result = [artist.id for artist in result]
    return result