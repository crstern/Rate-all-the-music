"""
Rating related model
"""

from apps.extensions import db
from .audit import Base
from sqlalchemy.orm import relationship


class Rating(Base):
    """
    Rating database model
    """

    __tablename__ = 'rating'

    number_of_stars = db.Column(db.Integer, default=5)
    title = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=True)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    likes = relationship('Like')
    number_of_likes = db.Column(db.Integer, default=0)

