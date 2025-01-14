function Categoryfilter() {
  return (
    <div className="d-flex mb-3">
      <a href="#" className="btn btn-link">
        All Notes
      </a>
      <a href="#" className="btn btn-link">
        Recents
      </a>
      <a
        href="http://localhost:5000/analytics-data"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-link"
      >
        Analytics
      </a>
    </div>
  );
}

export default Categoryfilter;
