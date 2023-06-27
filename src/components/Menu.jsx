import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Menu() {
  let location = useLocation();

  return (
    <nav className="my-2">
      <h2>Gestão de Usuários</h2>
      <div>
        <Link to="/" path={location.pathname}>
          <Button variant="primary">Home</Button>
        </Link>{" "}
        <Link to="/add" path={location.pathname}>
          <Button variant="primary">Adicionar Usuário</Button>
        </Link>
      </div>
    </nav>
  );
}

function LinkTo({ label, href, path }) {
  if (href === path) {
    return <>{label}</>;
  }

  return <Link to={href}>{label}</Link>;
}
