import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // después de salir, lo llevamos a login
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Mi App</h2>
      <ul style={styles.menu}>
        <li><Link to="/">Home</Link></li>

        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><button onClick={handleLogout} style={styles.logoutBtn}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

// estilos básicos
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "15px",
  },
  logoutBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Navbar;
