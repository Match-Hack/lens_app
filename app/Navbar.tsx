// NavbarComponent.tsx
"use client"; // Marquez cette ligne comme un Client Component
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/myprofile">
            <p>Profile</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
