import Link from 'next/link';
import './navbar.css'; // Assurez-vous d'importer le fichier CSS associé
import { useActiveProfile } from "@lens-protocol/react-web";

export default function Navbar() {
  const { data: wallet, error, loading } = useActiveProfile();
  if(loading) return <></>;
  if (wallet === null) return <></>;
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/">
            <p className="navbar-link">Home</p>
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/myprofile">
            <p className="navbar-link">Profile</p>
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/xmtp">
            <p className="navbar-link">Messagerie</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
