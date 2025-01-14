import pytest
from flask import Flask
from backend import app, db, Note  
from datetime import datetime

# Set up a testing database
@pytest.fixture
def test_client():
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    with app.test_client() as testing_client:
        with app.app_context():
            db.create_all()  # Create tables for the test database
        yield testing_client
        with app.app_context():
            db.drop_all()  # Clean up after tests

# Helper function to create a note
def create_note(client, data, folder):
    return client.post(
        "/add-note",
        json={"data": data, "folder": folder},
    )

# Test creating a note
def test_create_note(test_client):
    response = create_note(test_client, "Test note", "Work")
    assert response.status_code == 201
    assert response.json["data"] == "Test note"
    assert response.json["folder"] == "Work"

# Test retrieving all notes
def test_get_notes(test_client):
    create_note(test_client, "Test note 1", "Work")
    create_note(test_client, "Test note 2", "Personal")
    response = test_client.get("/get-notes")
    assert response.status_code == 200
    assert len(response.json) == 2

# Test updating a note
def test_update_note(test_client):
    response = create_note(test_client, "Old note", "Work")
    note_id = response.json["id"]
    update_response = test_client.put(
        f"/update-note/{note_id}",
        json={"data": "Updated note"},
    )
    assert update_response.status_code == 200
    assert update_response.json["data"] == "Updated note"

# Test deleting a note
def test_delete_note(test_client):
    response = create_note(test_client, "Test note", "Work")
    note_id = response.json["id"]
    delete_response = test_client.delete(f"/delete-note/{note_id}")
    assert delete_response.status_code == 200

    # Verify the note is deleted
    get_response = test_client.get("/get-notes")
    assert len(get_response.json) == 0

# Test error handling for invalid note deletion
def test_delete_nonexistent_note(test_client):
    response = test_client.delete("/delete-note/999")
    assert response.status_code == 404
    assert response.json["error"] == "Note not found"

# Test error handling for invalid note update
def test_update_nonexistent_note(test_client):
    response = test_client.put(
        "/update-note/999",
        json={"data": "New data"},
    )
    assert response.status_code == 404
    assert response.json["error"] == "Note not found"

# Test retrieving notes for analytics
def test_analytics_processing(test_client):
    create_note(test_client, "Morning note", "Work")
    create_note(test_client, "Afternoon note", "Personal")
    response = test_client.get("/analytics")
    assert response.status_code == 200
    assert "pie_chart_html" in response.data.decode()  
