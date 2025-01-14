from flask import Blueprint, render_template, request, flash, jsonify
from . import db
from .models import Note  
from .graphs import process_notes_for_pie_chart, process_notes_for_bar_chart
import plotly.graph_objs as go
import plotly.io as pio
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

views = Blueprint ('views', __name__)

@views.route('/home')
def homepage():
    return "<h1>Welcome home</h1>"

@views.route('/test')
def new_note():
    return "hello"

@views.route('/add-note', methods=['POST'])
def add_note():
    data = request.get_json()
    note_data = data.get('data')
    folder = data.get('folder')

    if not note_data or not folder:
        return jsonify({"error": "Data and folder are required"}), 400

    new_note = Note(data=note_data, folder=folder)  # Assuming Note model has a 'folder' field
    db.session.add(new_note)
    db.session.commit()

    return jsonify({"id": new_note.id, "data": new_note.data, "folder": new_note.folder}), 201

@views.route('/delete-note/<int:id>', methods=['DELETE'])
def delete_note(id):
    note = Note.query.get(id)
    if not note:
        return jsonify({"error": "Note not found"}), 404

    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Note deleted successfully"}), 200

@views.route('/get-notes', methods=['GET'])
def get_notes():
    notes = Note.query.all()
    notes_list = [
        {"id": note.id, "data": note.data, "folder": note.folder, "time": note.date}  
        for note in notes
    ]
    return jsonify(notes_list)

@views.route('/update-note/<int:id>', methods=['PUT'])
def update_note(id):
    data = request.get_json()  # Get JSON data sent from the frontend
    new_data = data.get('data')  # Extract the 'data' field

    if not new_data:
        return jsonify({"error": "Data field is required"}), 400

    note = Note.query.get(id)
    if not note:
        return jsonify({"error": "Note not found"}), 404

    # Update the note data
    note.data = new_data
    db.session.commit()
    return jsonify({"id": note.id, "data": note.data, "message": "Note updated successfully"}), 200

folders = {
    "Personal": 12,
    "Work": 50,
    "School": 99
}
@views.route('/folders', methods=['GET'])
def get_folders():
    return jsonify(folders)


@views.route('/analytics-data')
def analytics():
    # Fetch notes from the database
    notes = Note.query.all()

    # Convert SQLAlchemy objects to dictionaries
    notes_data = [
        {
            "id": note.id,
            "data": note.data,
            "folder": note.folder,
            "date": note.date.isoformat() if note.date else None
        }
        for note in notes
    ]

    # Process notes data for charts
    pie_chart_data = process_notes_for_pie_chart(notes_data)
    bar_chart_data = process_notes_for_bar_chart(notes_data)

    # Generate Pie Chart
    pie_chart = go.Figure(
        data=[
            go.Pie(
                labels=pie_chart_data["labels"],
                values=pie_chart_data["values"]
            )
        ],
        layout=go.Layout(title="Distribution of Notes by Folder")
    )
    pie_chart_html = pio.to_html(pie_chart, full_html=False)

    # Generate Bar Chart
    bar_chart = go.Figure(
        data=[
            go.Bar(
                x=bar_chart_data["x"],
                y=bar_chart_data["y"],
                marker_color="blue"
            )
        ],
        layout=go.Layout(
            title="Notes Created Over Time",
            xaxis=dict(title="Time Period"),
            yaxis=dict(title="Number of Notes")
        )
    )
    bar_chart_html = pio.to_html(bar_chart, full_html=False)

    # Render the graphs in the analytics.html template
    return render_template(
        "analytic.html",
        pie_chart=pie_chart_html,
        bar_chart=bar_chart_html
    )