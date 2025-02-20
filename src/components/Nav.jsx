"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="font-serif text-xl">
      {/* Desktop Nav */}
      <ul className="hidden md:flex text-center">
        <li className="flex-1 py-2 hover:underline underline-offset-8">
          <Link href="/">Home</Link>
        </li>
        <li
          className="relative flex-1 py-2 hover:underline underline-offset-8"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
          onClick={() => setDropdownOpen(false)}
        >
          <Link href="/artworks">Gallery Explorer</Link>
          {dropdownOpen && (
            <ul className="absolute w-full mt-2 py-4 bg-white shadow-lg rounded rounded-t-none">
              <li className="py-2 hover:underline underline-offset-8">
                <Link href="/artworks/chicago">
                  The Art Institute of Chicago
                </Link>
              </li>
              <li className="py-2 hover:underline underline-offset-8">
                <Link href="/artworks/cleveland">
                  The Cleveland Museum of Art
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="flex-1 py-2 hover:underline underline-offset-8">
          <Link href="/exhibitions">Exhibitions</Link>
        </li>
      </ul>
      {/* Mobile Nav */}
      <div className="md:hidden py-2" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <FiX className="mx-auto text-2xl" />
        ) : (
          <FiMenu className="mx-auto text-2xl" />
        )}
      </div>
      {isOpen && (
        <ul className="md:hidden p-4 flex flex-col items-center gap-4">
          <li onClick={() => setIsOpen(false)}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link href="/artworks">Gallery Explorer</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link href="/exhibitions">Exhibitions</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
