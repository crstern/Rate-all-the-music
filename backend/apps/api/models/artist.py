"""
artist related model
"""

from apps.extensions import db
from .audit import Base
from sqlalchemy.orm import relationship


class Artist(Base):
    """
    Artist database model
    """

    __tablename__ = 'artist'

    name = db.Column(db.String(255), nullable=False)
    origin_country = db.Column(db.String(255))
    image = db.Column(db.String, nullable=True)
    description = db.Column(db.Text, nullable=True)
    genre_id = db.Column(db.Integer, db.ForeignKey('genre.id'), nullable=True)
    formed_year = db.Column(db.Integer, nullable=True)
    record_label = db.Column(db.String(255), nullable=True)
    website = db.Column(db.String(255), nullable=True)
    facebook_link = db.Column(db.String(255), nullable=True)
    members = db.Column(db.Integer, nullable=True)
    total_note = db.Column(db.Float, nullable=False, default=0)
    albums = relationship("Album", backref='artist', cascade="all, delete-orphan")
    ratings = relationship("Rating")

    db.UniqueConstraint('name', 'origin_country', name='uix_1')

    def __repr__(self):
        """
        Artist representation
        """
        return f'<Artist {self.username} {self.email}>'

