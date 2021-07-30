from apps.extensions import db
from .artist_service import get_artist_details_by_id
from apps.api.utils import get_current_user
from apps.api.models import Rating


def add_rating_to_artist(artist_id, data):
    artist = get_artist_details_by_id(artist_id)  # this only makes sure the artist exists
    user = get_current_user()
    data.update({
        "artist_id": artist_id,
        "user_id": user.id
    })

    rating = Rating(**data)
    db.session.add(rating)
    db.session.commit()

    return artist

