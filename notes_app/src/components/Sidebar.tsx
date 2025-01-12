import React, { useEffect, useState } from "react";

interface FolderData {
  [folderName: string]: number;
}

const Sidebar: React.FC = () => {
  const [folders, setFolders] = useState<FolderData>({}); // State to hold folder data

  useEffect(() => {
    // Fetch folder data from the backend
    fetch("http://localhost:5000/folders") // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: FolderData) => setFolders(data))
      .catch((error) => console.error("Error fetching folder data:", error));
  }, []);

  return (
    <div>
      <h5>Folders</h5>
      <ul className="list-group">
        {Object.entries(folders).map(([folderName, count]) => (
          <li
            key={folderName}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {folderName}
            <span className="badge bg-primary rounded-pill">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
