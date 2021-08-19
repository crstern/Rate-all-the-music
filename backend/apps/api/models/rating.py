"""
Rating related model
"""

from apps.extensions import db
from .audit import Base

from sqlalchemy.orm import relationship

association_table = db.Table('association', Base.metadata,
                             db.Column('rating_id', db.ForeignKey('rating.id')),
                             db.Column('user_id', db.ForeignKey('user.id'))
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    users_that_like = relationship('User', secondary=association_table)
