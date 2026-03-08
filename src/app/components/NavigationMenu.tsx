"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import CartCounter from "./CartCounter";


const navLinks = [
  { href: "/", label: "Shop" },
  {href: "/contact", label: "Contact"},
  {href:"/cart", label: `Cart`},

  
];

export default function NavigationMenu() {
  const pathname = usePathname(); 

  return (
    <nav className="flex flex-row items-baseline justify-evenly mt-5 mb-5">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              marginRight: "10px",
              fontWeight: isActive ? "bold" : "normal", 
              textDecoration: isActive ? "underline" : "none", 
            }}
          >
            {link.label}
          </Link>
        );
      })}
      <div><CartCounter/></div>
    </nav>
  );
}