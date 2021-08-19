"""
Image related model
"""

from apps.extensions import db
from .audit import Base


class Image(Base):
    """
    Image database model
    """
    __tablename__ = 'image'

    filename = db.Column(db.String(255), nullable=True, unique=True)
