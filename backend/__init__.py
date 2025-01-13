from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_cors import CORS

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)

    # App configuration
    app.config['SECRET_KEY'] = 'wnjfijw nfhdiwijk fiw'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    CORS(app)  # Enable CORS for React frontend communication

    # Import and register blueprints
    from .views import views
    app.register_blueprint(views, url_prefix='/')

    from .models import Note  # Import models to create tables
    create_database(app)

    return app

# Create the database if it doesn't already exist
def create_database(app):
    if not path.exists('backend/' + DB_NAME):
        with app.app_context():
            db.create_all()
        print("Database Created!")