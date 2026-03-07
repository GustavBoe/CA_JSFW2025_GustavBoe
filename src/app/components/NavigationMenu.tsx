"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import CartCounter from "./CartCounter";
import useCartStore from "@/stores/CartStore";

const navLinks = [
  { href: "/", label: "Shop" },
  {href: "/contact", label: "Contact"},
  {href:"/cart", label: "Cart"}
];

export default function NavigationMenu() {
  const pathname = usePathname(); 

  return (
    <nav>
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
      <span><CartCounter/></span>
    </nav>
  );
}