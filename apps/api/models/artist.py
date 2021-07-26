"""
user related model
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
    image_id = db.Column(db.String(255))
    description = db.Column(db.Text)
    albums = relationship("Album")
    ratings = relationship("Rating")

    def __repr__(self):
        """
        Artist representation
        """
        return f'<Artist {self.username} {self.email}>'