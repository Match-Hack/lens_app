import Link from 'next/link';
import './navbar.css'; // Assurez-vous d'importer le fichier CSS associé
import { useActiveProfile } from "@lens-protocol/react-web";

export default function Navbar() {
  const { data: wallet, error, loading } = useActiveProfile();
  if (loading) return <></>;
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
<<<<<<< HEAD
          <a href="https://xmtp.chat/" target="_blank" rel="noopener noreferrer" className="navbar-link">
            Messaging
          </a>
=======
          <Link href="/messaging">
            <p className="navbar-link">Chat</p>
          </Link>
>>>>>>> 6bec93b33296e40b0d71669998dccbb8841f4f2a
        </li>
      </ul>
    </nav>
  );
}
