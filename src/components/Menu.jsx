import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Menu() {
  let location = useLocation();

  return (
    <nav className="my-2">
      <h1>Lojas do Mago</h1>
      <p>Tecnologia que parece mágica!</p>
    </nav>
  );
}

function LinkTo({ label, href, path }) {
  if (href === path) {
    return <>{label}</>;
  }

  return <Link to={href}>{label}</Link>;
}
