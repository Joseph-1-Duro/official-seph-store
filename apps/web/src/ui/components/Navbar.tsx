"use client"

import { ChevronDown, Menu, MoveUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const dropDownItems: { label: string; href: string }[] = [
  { label: "Perfume", href: "/categories/perfume" },
  { label: "Footwear", href: "/categories/footwear" },
  { label: "Cosmetics", href: "/categories/cosmetics" },
  { label: "Clothing", href: "/categories/clothing" },
  { label: "Jewelry", href: "/categories/jewelry" },
  { label: "Bags & Purses", href: "/categories/bags&purses" },
  { label: "Accessories", href: "/categories/accessories" },
  { label: "Watches", href: "/categories/watches" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isCategoriesActive = pathname.startsWith("/categories");

  useEffect(() => {
    if (!dropdownOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <button
        className="navbar__toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`navbar__backdrop ${menuOpen ? "is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <ul className={`navbar__links ${menuOpen ? "is-open" : ""}`}>
        <li className="navbar__close-item">
          <button
            className="navbar__close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </li>

        <li>
          <Link
            href="/shop"
            className="navbar__link"
            aria-current={isActive("/shop") ? "page" : undefined}
            onClick={closeMenu}
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="navbar__link"
            aria-current={isActive("/contact") ? "page" : undefined}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/faq"
            className="navbar__link"
            aria-current={isActive("/faq") ? "page" : undefined}
            onClick={closeMenu}
          >
            FAQ
          </Link>
        </li>

        <li
          ref={dropdownRef}
          className={`dropdown ${dropdownOpen ? "is-open" : ""} ${isCategoriesActive ? "is-active" : ""}`}
        >
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="dropdown__trigger"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <span>Categories</span>
            <ChevronDown className="dropdown__icon" size={18} strokeWidth={4} aria-hidden="true" />
          </button>

          <div className="dropdown__wrapper">
            <div className="dropdown__inner">
              <div className="dropdown__menu">
                <ul className="dropdown__list">
                  {dropDownItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`dropdown__link ${isActive(item.href) ? "is-active" : ""}`}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={closeMenu}
                      >
                        <MoveUpRight size={14} aria-hidden="true" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}