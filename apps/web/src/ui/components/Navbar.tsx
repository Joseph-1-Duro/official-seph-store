"use client"

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [ menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="navbar">
      <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        { menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className="navbar__links">
        <li><Link href={'/shop'}>Shop</Link></li>
        <li><Link href={'/contact'}>Contatct</Link></li>
        <li className="categories">Categories</li>
      </ul>
    </nav>
  )
}
