// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";

// function Createbutton() {
//   const [show, setShow] = useState(false);
//   const [data, setData] = useState(""); // State to hold form input data

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent page refresh
//     console.log("Sending data:", data); // Debugging line

//     try {
//       const response = await fetch("http://localhost:5000/add-note", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data }), // Send 'data' to the backend
//       });

//       if (response.ok) {
//         alert("Note added successfully!");
//         setData(""); // Clear the form field
//         handleClose(); // Close the modal
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to add note: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         New note
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>New Note</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="data">
//               <Form.Label>Data</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={data}
//                 onChange={(e) => setData(e.target.value)} // Update state with input value
//                 required
//               />
//             </Form.Group>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button type="submit" variant="primary">
//                 Submit
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Createbutton;

////////////////////////////////////////
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Createbutton() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(""); // State to hold form input data
  const [folder, setFolder] = useState("Personal"); // State to hold selected folder

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Sending data:", { data, folder }); // Debugging line

    try {
      const response = await fetch("http://localhost:5000/add-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, folder }), // Send 'data' and 'folder' to the backend
      });

      if (response.ok) {
        alert("Note added successfully!");
        setData(""); // Clear the form field
        setFolder("Personal"); // Reset folder selection
        handleClose(); // Close the modal
      } else {
        const errorData = await response.json();
        alert(`Failed to add note: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New note
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="data">
              <Form.Label>Data</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={data}
                onChange={(e) => setData(e.target.value)} // Update state with input value
                required
              />
            </Form.Group>
            <Form.Group controlId="folder">
              <Form.Label>Folder</Form.Label>
              <Form.Control
                as="select"
                value={folder}
                onChange={(e) => setFolder(e.target.value)} // Update state with selected folder
                required
              >
                <option value="Personal">Personal</option>
                <option value="School">School</option>
                <option value="Work">Work</option>
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Createbutton;
