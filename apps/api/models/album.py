"""
Album related model
"""
from sqlalchemy.orm import relationship

from apps.extensions import db
from .audit import Base


class Album(Base):
    """
    Album database model
    """

    __tablename__ = 'album'

    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_id = db.Column(db.Integer, nullable=True)
    release_year = db.Column(db.Integer, nullable=True)
    genre = db.Column(db.Integer, db.ForeignKey('genre.id'))
    ratings = relationship("Rating")

    def __repr__(self):
        """
        User representation
        """
        return f'<User {self.name} >'
