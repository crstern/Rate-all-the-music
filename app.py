"""
Main application
"""
import os
from flask import jsonify

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from apps.api import blueprint
from apps import create_app, db
from apps.api.utils import AuthError


app = create_app(os.getenv('IMDB_ENV', 'default'))
app.register_blueprint(blueprint)

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)


@manager.command
def run():
    app.run()


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


if __name__ == '__main__':
    manager.run()