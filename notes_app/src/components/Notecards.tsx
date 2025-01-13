// import React, { useState, useEffect } from "react";

// type Note = {
//   id: number;
//   data: string;
//   // change
//   folder: "Personal" | "School" | "Work";
// };

// const Notecards = () => {
//   const [notes, setNotes] = useState<Note[]>([]);

//   // Function to fetch notes from the backend
//   const fetchNotes = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/get-notes");
//       const data = await response.json();
//       setNotes(data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   // Function to handle updating a note
//   const handleUpdateNote = async (id: number, updatedData: string) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/update-note/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: updatedData }),
//       });

//       if (response.ok) {
//         console.log("Note updated successfully!");
//         setNotes(
//           notes.map((note) =>
//             note.id === id ? { ...note, data: updatedData } : note
//           )
//         );
//       } else {
//         console.error("Failed to update note.");
//       }
//     } catch (error) {
//       console.error("Error updating note:", error);
//     }
//   };

//   // Function to handle deleting a note
//   const handleDeleteNote = async (id: number) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/delete-note/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         console.log("Note deleted successfully!");
//         setNotes(notes.filter((note) => note.id !== id));
//       } else {
//         console.error("Failed to delete note.");
//       }
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//   };

//   // Render a single note card
//   const NoteCard = ({ id, data }: { id: number; data: string }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedData, setEditedData] = useState(data);

//     const handleSave = () => {
//       handleUpdateNote(id, editedData); // Update the note in the backend
//       setIsEditing(false); // Exit editing mode
//     };

//     return (
//       <div className="col-md-4 mb-4">
//         <div className="card">
//           <div
//             style={{
//               height: "150px",
//               backgroundColor: "#f8f9fa",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "24px",
//               color: "#6c757d",
//             }}
//           >
//             Note #{id}
//           </div>
//           <div className="card-body">
//             {isEditing ? (
//               <>
//                 <textarea
//                   className="form-control mb-2"
//                   value={editedData}
//                   onChange={(e) => setEditedData(e.target.value)}
//                   autoFocus
//                 />
//                 <button className="btn btn-success me-2" onClick={handleSave}>
//                   Save
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p className="card-text">{data}</p>
//                 <button
//                   className="btn btn-primary me-2"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteNote(id)}
//                 >
//                   Delete
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Fetch notes on component mount
//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   return (
//     <div className="row">
//       {notes.map((note) => (
//         <NoteCard key={note.id} id={note.id} data={note.data} />
//       ))}
//     </div>
//   );
// };

// export default Notecards;

//////////////////////////////////////////////

// const NoteCard = ({
//   id,
//   data,
//   category,
// }: {
//   id: number;
//   data: string;
//   category: "Personal" | "School" | "Work";
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(data);

//   const handleSave = () => {
//     handleUpdateNote(id, editedData); // Update the note in the backend
//     setIsEditing(false); // Exit editing mode
//   };

//   // Determine the tag color based on the category
//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case "Personal":
//         return "badge-primary";
//       case "School":
//         return "badge-success";
//       case "Work":
//         return "badge-warning";
//       default:
//         return "badge-secondary";
//     }
//   };

//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card">
//         <div
//           style={{
//             height: "150px",
//             backgroundColor: "#f8f9fa",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "24px",
//             color: "#6c757d",
//           }}
//         >
//           Note #{id}
//         </div>
//         <div className="card-body">
//           {/* Category Tag */}
//           <span className={`badge ${getCategoryColor(category)} mb-2`}>
//             {category}
//           </span>
//           {isEditing ? (
//             <>
//               <textarea
//                 className="form-control mb-2"
//                 value={editedData}
//                 onChange={(e) => setEditedData(e.target.value)}
//                 autoFocus
//               />
//               <button className="btn btn-success me-2" onClick={handleSave}>
//                 Save
//               </button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <>
//               <p className="card-text">{data}</p>
//               <button
//                 className="btn btn-primary me-2"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="btn btn-danger"
//                 onClick={() => handleDeleteNote(id)}
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

//////////////// This is correct version
// import React, { useState, useEffect } from "react";

// type Note = {
//   id: number;
//   data: string;
// };

// const Notecards = () => {
//   const [notes, setNotes] = useState<Note[]>([]);

//   // Function to fetch notes from the backend
//   const fetchNotes = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/get-notes");
//       const data = await response.json();
//       setNotes(data);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   // Function to handle updating a note
//   const handleUpdateNote = async (id: number, updatedData: string) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/update-note/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: updatedData }),
//       });

//       if (response.ok) {
//         console.log("Note updated successfully!");
//         setNotes(
//           notes.map((note) =>
//             note.id === id ? { ...note, data: updatedData } : note
//           )
//         );
//       } else {
//         console.error("Failed to update note.");
//       }
//     } catch (error) {
//       console.error("Error updating note:", error);
//     }
//   };

//   // Function to handle deleting a note
//   const handleDeleteNote = async (id: number) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/delete-note/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         console.log("Note deleted successfully!");
//         setNotes(notes.filter((note) => note.id !== id));
//       } else {
//         console.error("Failed to delete note.");
//       }
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//   };

//   // Render a single note card
//   const NoteCard = ({ id, data }: { id: number; data: string }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedData, setEditedData] = useState(data);

//     const handleSave = () => {
//       handleUpdateNote(id, editedData); // Update the note in the backend
//       setIsEditing(false); // Exit editing mode
//     };

//     return (
//       <div className="col-md-4 mb-4">
//         <div className="card">
//           <div
//             style={{
//               height: "150px",
//               backgroundColor: "#f8f9fa",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "24px",
//               color: "#6c757d",
//             }}
//           >
//             Note #{id}
//           </div>
//           <div className="card-body">
//             {isEditing ? (
//               <>
//                 <textarea
//                   className="form-control mb-2"
//                   value={editedData}
//                   onChange={(e) => setEditedData(e.target.value)}
//                   autoFocus
//                 />
//                 <button className="btn btn-success me-2" onClick={handleSave}>
//                   Save
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p className="card-text">{data}</p>
//                 <button
//                   className="btn btn-primary me-2"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteNote(id)}
//                 >
//                   Delete
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Fetch notes on component mount
//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   return (
//     <div className="row">
//       {notes.map((note) => (
//         <NoteCard key={note.id} id={note.id} data={note.data} />
//       ))}
//     </div>
//   );
// };

// export default Notecards;

////// with tags
import React, { useState, useEffect } from "react";

type Note = {
  id: number;
  data: string;
  folder: "Personal" | "School" | "Work";
};

// Child component: Renders an individual note
const NoteCard = ({
  id,
  data,
  folder,
  handleUpdateNote,
  handleDeleteNote,
}: {
  id: number;
  data: string;
  folder: "Personal" | "School" | "Work";
  handleUpdateNote: (id: number, updatedData: string) => void;
  handleDeleteNote: (id: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleSave = () => {
    handleUpdateNote(id, editedData); // Update the note in the backend
    setIsEditing(false); // Exit editing mode
  };

  const getFolderColor = (folder: string) => {
    switch (folder) {
      case "Personal":
        return "badge-primary";
      case "School":
        return "badge-success";
      case "Work":
        return "badge-warning";
      default:
        return "badge-secondary";
    }
  };

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
          Note #{id}
        </div>
        <div className="card-body">
          {/* Folder Tag */}
          <span className={`badge ${getFolderColor(folder)} mb-2`}>
            {folder}
          </span>
          {isEditing ? (
            <>
              <textarea
                className="form-control mb-2"
                value={editedData}
                onChange={(e) => setEditedData(e.target.value)}
                autoFocus
              />
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className="card-text">{data}</p>
              <button
                className="btn btn-primary me-2"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteNote(id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Parent component: Fetches notes and renders a list of NoteCards
const Notecards = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleUpdateNote = async (id: number, updatedData: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update-note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updatedData }),
      });

      if (response.ok) {
        console.log("Note updated successfully!");
        setNotes(
          notes.map((note) =>
            note.id === id ? { ...note, data: updatedData } : note
          )
        );
      } else {
        console.error("Failed to update note.");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete-note/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Note deleted successfully!");
        setNotes(notes.filter((note) => note.id !== id));
      } else {
        console.error("Failed to delete note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="row">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          data={note.data}
          folder={note.folder} // Pass the folder here
          handleUpdateNote={handleUpdateNote}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
    </div>
  );
};

export default Notecards;
