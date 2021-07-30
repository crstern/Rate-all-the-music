"""
Audit base class related model
"""
from apps.extensions import db
import uuid


class Base(db.Model):
    """
    Abstract base data model to be extended in all models.
    Defines audit fields for a model.
    """

    __abstract__ = True

    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    id = db.Column(db.Integer, primary_key=True)