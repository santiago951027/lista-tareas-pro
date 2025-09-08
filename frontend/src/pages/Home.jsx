import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bienvenido a la Home 🏠</h1>
      <p>
        <Link to="/login">Iniciar Sesión</Link> |{" "}
        <Link to="/register">Registrarse</Link>
      </p>
    </div>
  );
}

export default Home;
