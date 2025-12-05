import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
  setIsAuthenticated(false);
  localStorage.removeItem("user");
  console.log("User logged out");
};

  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/add-job">Add Job</Link>}
        {!isAuthenticated && <Link to="/signup">Sign Up</Link>}
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}
 
export default Navbar;