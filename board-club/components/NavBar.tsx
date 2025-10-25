"use client";

import Link from "next/link";
import { Home, UserPlus, LogIn, Store, History, User } from "lucide-react";

export default function Navbar() {
  const links = [
    { href: "/", label: "Início", icon: <Home size={18} /> },
    { href: "/cadastro", label: "Cadastro", icon: <UserPlus size={18} /> },
    { href: "/login", label: "Login", icon: <LogIn size={18} /> },
    { href: "/lojas", label: "Lojas", icon: <Store size={18} /> },
    { href: "/reservas", label: "Reservas", icon: <History size={18} /> },
    { href: "/perfil", label: "Perfil", icon: <User size={18} /> },
  ];

  return (
    <nav className="bg-emerald-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / nome */}
        <h1 className="text-xl font-semibold tracking-wide">BoardClub</h1>

        {/* Links */}
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
