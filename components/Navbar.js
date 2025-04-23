"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="h-16 bg-blue-600 text-white flex justify-between items-center p-4 fixed inset-0 ">
        <div className="logo  text-3xl font-medium">
          <Link className="bebas" href="/">SHRT <span className="text-xs font-light font-sans">- shorten no hassle</span></Link>
        </div>

        {/* DESKTOP MENU */}

        <div className="hidden sm:flex">
          <ul className="flex gap-4 items-center">
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="https://prajulprem.github.io/" target="_blank">
              <li>Contact Us</li>
            </Link>

            <li className="flex gap-4 items-center">
              <Link
                target="_blank"
                href="https://github.com/prajulprem/Shrt.git"
              >
                <button className="p-3 py-2 bg-blue-900 rounded-lg shadow-lg cursor-pointer">
                  Github
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <button className="block sm:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-700 text-white p-4 flex flex-col gap-4 sm:hidden">
            <Link href="/" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="https://prajulprem.github.io/" target="_blank">
              <li>Contact Us</li>
            </Link>
            <Link href="https://github.com/prajulprem/Shrt.git" target="_blank">
              GitHub
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
