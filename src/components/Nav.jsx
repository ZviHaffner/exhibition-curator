"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="font-serif text-xl py-2">
      {/* Desktop Nav */}
      <ul className="hidden md:flex text-center">
        <li className="flex-1 hover:underline underline-offset-8">
          <Link href="/">Home</Link>
        </li>
        <li className="flex-1 hover:underline underline-offset-8">
          <Link href="/artworks">Gallery Explorer</Link>
        </li>
        <li className="flex-1 hover:underline underline-offset-8">
          <Link href="/exhibitions">Exhibitions</Link>
        </li>
      </ul>
      {/* Mobile Nav */}
      <div
        className="md:hidden"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <FiX className="mx-auto text-2xl" />
        ) : (
          <FiMenu className="mx-auto text-2xl" />
        )}
      </div>
      {isOpen && (
        <ul className="md:hidden p-4 flex flex-col items-center gap-4">
          <li
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Link href="/artworks">Gallery Explorer</Link>
          </li>
          <li
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Link href="/exhibitions">Exhibitions</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
