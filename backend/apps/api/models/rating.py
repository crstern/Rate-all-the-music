"""
Rating related model
"""

from apps.extensions import db
from .audit import Base

from sqlalchemy.orm import relationship

association_table = db.Table('association', Base.metadata,
                             db.Column('rating_username', db.ForeignKey('rating.username')),
                             db.Column('user_username', db.ForeignKey('user.username'))
                             )


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
    username = db.Column(db.String, db.ForeignKey('user.username'), nullable=False, unique=True)
    users_that_like = relationship('User', secondary=association_table)
    number_of_likes = db.Column(db.Integer, nullable=False, default=0)
