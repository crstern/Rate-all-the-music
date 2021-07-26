"""
Rating related model
"""

from apps.extensions import db
from .audit import Base


class Rating(Base):
    """
    Rating database model
    """

    __tablename__ = 'rating'

    number_of_stars = db.Column(db.Integer, default=5)
    title = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    artist_id = db.Column(db.String(255), db.ForeignKey('artist.public_id'), nullable=True)
    album_id = db.Column(db.String(255), db.ForeignKey('album.public_id'), nullable=True)

