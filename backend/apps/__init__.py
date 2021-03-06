"""
Top level module

This module:

- Contains create_app()
- Registers extensions
"""
from flask import Flask

# Import config
from config import config_by_name

# Import extensions
from .extensions import (
    db,
    pagination,
    mail
)


def create_app(config_name):
    """
    Flask app create method

    Args:
        config_name

    Returns:
        app
    """
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    mail.init_app(app)
    pagination.init_app(app, db)

    return app
