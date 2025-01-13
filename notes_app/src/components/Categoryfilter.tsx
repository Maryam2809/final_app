function Categoryfilter() {
  return (
    <div className="d-flex mb-3">
      <button className="btn btn-link">All Notes</button>
      <button className="btn btn-link">Recents</button>
      <a
        href="http://localhost:5000/analytics-data"
        target="_blank"
        rel="noopener noreferrer"
      >
        Analytics
      </a>
    </div>
  );
}

export default Categoryfilter;

// import React, { useState } from "react";
// import Analytics from "./Analytics"; // Import the Analytics component

// function Categoryfilter() {
//   const [activeView, setActiveView] = useState("All Notes");

//   return (
//     <div>
//       <div className="d-flex mb-3">
//         <button
//           className="btn btn-link"
//           onClick={() => setActiveView("All Notes")}
//         >
//           All Notes
//         </button>
//         <button
//           className="btn btn-link"
//           onClick={() => setActiveView("Recents")}
//         >
//           Recents
//         </button>
//         <button
//           className="btn btn-link"
//           onClick={() => setActiveView("Analytics")}
//         >
//           Analytics
//         </button>
//       </div>

//       <div>
//         {/* Conditionally render components based on activeView */}
//         {activeView === "All Notes" && (
//           <p>All Notes view (to be implemented)</p>
//         )}
//         {activeView === "Recents" && <p>Recents view (to be implemented)</p>}
//         {activeView === "Analytics" && <Analytics />}
//       </div>
//     </div>
//   );
// }

// export default Categoryfilter;
