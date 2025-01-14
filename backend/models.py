from backend import db
from sqlalchemy.sql import func

# Define the Notes db model
class Note(db.Model):
    id = db.Column(db.Integer, primary_key =True )
    data = db.Column(db.String(10000))
    folder = db.Column(db.String(100))
    date = db.Column(db.DateTime(timezone=True), default=func.now())