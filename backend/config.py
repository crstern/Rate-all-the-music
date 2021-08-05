from os import environ, path, getcwd
from dotenv import load_dotenv


basedir = path.dirname(path.abspath(__file__))
ENV = environ.get('IMDB', 'development')

if ENV == 'productions':
    dotenv_file = '.env.production'
elif ENV == 'test':
    dotenv_file = '.env.test'
else:
    dotenv_file = '.env'

load_dotenv(path.join(basedir, dotenv_file))


class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{environ.get('DATABASE_USERNAME')}:{environ.get('DATABASE_PASSWORD')}@"
        f"{environ.get('DATABASE_HOST')}:{environ.get('DATABASE_PORT')}/{environ.get('DATABASE_NAME')}"
    )
    SECRET_KEY = environ.get('SECRET_KEY')
    UPLOAD_FOLDER = path.join(getcwd(), 'images')


class TestConfig(Config):
    DEBUG = True
    TESTING = True
    # For test purpose use a new database
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{environ.get('DATABASE_USERNAME')}:{environ.get('DATABASE_PASSWORD')}@"
        f"{environ.get('DATABASE_HOST')}:{environ.get('DATABASE_PORT')}/{environ.get('TEST_DATABASE_NAME')}"
    )
    PRESERVE_CONTEXT_ON_EXCEPTION = False


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True


config_by_name = dict(
    development=DevelopmentConfig,
    production=ProductionConfig,
    default=DevelopmentConfig,
    testing=TestConfig
)