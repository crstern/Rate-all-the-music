"""
user related model
"""
from sqlalchemy.orm import relationship
from apps.extensions import db
from .audit import Base


class User(Base):
    """
    User database model
    """

    __tablename__ = 'user'

    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, default=False)
    ratings = relationship('Rating')

    def __repr__(self):
        """
        User representation
        """
        return f'<User {self.username} {self.email}>'