import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';

export default function Menu() {
  let location = useLocation();

  return (
    <nav className="header-logo my-0">
      <Image className="float-start" src="lojasdomago-logo-200.jpg" alt="Logo Lojas do Msgo" width="80px"/>
      <h1>Lojas do Mago</h1>
      <p>Solana Markeplace: Tecnologia que parece mágica</p>
    </nav>
  );
}

function LinkTo({ label, href, path }) {
  if (href === path) {
    return <>{label}</>;
  }

  return <Link to={href}>{label}</Link>;
}
