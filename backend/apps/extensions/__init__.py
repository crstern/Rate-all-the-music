"""
Extensions module

Each extension is initialized when app is created.
"""
from flask_mail import Mail
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_rest_paginate import Pagination

mail = Mail()
db = SQLAlchemy()
migrate = Migrate()
pagination = Pagination()
