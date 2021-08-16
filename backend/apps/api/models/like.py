"""
Comment related model
"""
from sqlalchemy.orm import relationship

from apps.extensions import db
from .audit import Base


class Like(Base):
    """
    Like database model
    """

    __tablename__ = 'like'

    rating_id = db.Column(db.Integer, db.ForeignKey('rating.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        """
        Like representation
        """
        return f'<Like {self.rating_id} from {self.user_id} >'