"""
Extensions module

Each extension is initialized when app is created.
"""

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_rest_paginate import Pagination


db = SQLAlchemy()
migrate = Migrate()
pagination = Pagination()
