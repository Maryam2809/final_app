import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Categoryfilter from "./components/Categoryfilter";
import Notecards from "./components/Notecards";
import Createbutton from "./components/Createbutton";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="container-fluid">
      {" "}
      <div className="row">
        {""}
        <div>
          <Navbar />
        </div>
        <div className="col-md-3 bg-light" style={{ marginTop: "30px" }}>
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Header />
            <Createbutton />
          </div>
          <Categoryfilter />
          <div className="container">
            <Notecards />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
