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

    path = db.Column(db.String(255), nullable=False)