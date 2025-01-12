import React, { useState, useEffect } from "react";

type Note = {
  id: number;
  data: string;
};

const Notecards = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Function to fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-notes");
      const data = await response.json();
      setNotes(data); // Update state with fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to handle deleting a note
  const handleDeleteNote = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete-note/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Note deleted successfully!");
        setNotes(notes.filter((note) => note.id !== id)); // Update state to remove deleted note
      } else {
        console.error("Failed to delete note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Render a single note card
  const NoteCard = ({ id, data }: { id: number; data: string }) => {
    return (
      <div className="col-md-4 mb-4">
        <div className="card">
          <div
            style={{
              height: "150px",
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#6c757d",
            }}
          >
            {/* Placeholder for an image or a unique ID */}
            Note #{id}
          </div>
          <div className="card-body">
            <p className="card-text">{data}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteNote(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="row">
      {notes.map((note) => (
        <NoteCard key={note.id} id={note.id} data={note.data} />
      ))}
    </div>
  );
};

export default Notecards;
