"""
genre related model
"""

from apps.extensions import db
from .audit import Base
from sqlalchemy.orm import relationship


class Genre(Base):
    """
    Genre database model
    """

    __tablename__ = 'genre'

    name = db.Column(db.String(255), nullable=False)
    artists = relationship('Artist')