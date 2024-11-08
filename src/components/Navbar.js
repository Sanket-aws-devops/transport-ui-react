import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Bus Tracker</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Buses</Link>
          <Link className="nav-link" to="/add-bus">Add Bus</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 