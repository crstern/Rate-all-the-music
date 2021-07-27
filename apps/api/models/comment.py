"""
Comment related model
"""
from sqlalchemy.orm import relationship

from apps.extensions import db
from .audit import Base


class Comment(Base):
    """
    Comment database model
    """

    __tablename__ = 'comment'

    content = db.Column(db.Text, nullable=False)
    likes = db.Column(db.Integer, default=0)
    rating_id = db.Column(db.Integer, db.ForeignKey('rating.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    def __repr__(self):
        """
        User representation
        """
        return f'<User {self.name} >'