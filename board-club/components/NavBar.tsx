"use client";

import Link from "next/link";
import {
  Gamepad,
  Store,
  Info,
  User,
  ShoppingCart,
  Menu,
  X,
  Dices,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/jogos", label: "Jogos", icon: <Gamepad size={18} /> },
    { href: "/lojas", label: "Lojas", icon: <Store size={18} /> },
    { href: "/sobre", label: "Sobre Nós", icon: <Info size={18} /> },
  ];

  const actionLinks = [
    { href: "/carrinho", label: "Carrinho", icon: <ShoppingCart size={18} /> },
    { href: "/perfil", label: "Perfil", icon: <User size={18} /> },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    // NAVBAR FIXA NO TOPO
    <nav className="bg-emerald-900 text-white shadow-md fixed top-0 w-full z-50">
      {/* Container principal (Desktop/Mobile) */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO: ÍCONE DICES + TEXTO */}
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <Dices size={28} className="text-yellow-400" />
          <h1 className="text-xl font-semibold tracking-wide">BoardClub</h1>
        </Link>

        {/* BLOCO DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          {/* Links de Navegação Principal (Desktop) */}
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

          {/* Ações (Carrinho + Perfil - Desktop) */}
          <div className="flex items-center gap-5">
            {/* Carrinho */}
            <Link
              href="/carrinho"
              className="flex items-center gap-2 p-1 hover:text-yellow-400 transition-colors duration-200"
              title="Carrinho de Compras"
            >
              <ShoppingCart size={24} />
              <span className="font-medium">Carrinho</span>
            </Link>

            {/* Perfil */}
            <Link
              href="/perfil"
              className="flex items-center gap-2 p-1 hover:text-yellow-400 transition-colors duration-200"
              title="Meu Perfil"
            >
              <User size={24} />
              <span className="font-medium">Perfil</span>
            </Link>
          </div>
        </div>

        {/* BOTÃO HAMBÚRGUER */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-emerald-800 transition-colors duration-150"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100 py-2" : "max-h-0 opacity-0"
        } bg-emerald-800 border-t border-emerald-700`}
      >
        <ul className="flex flex-col space-y-2 px-4 py-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center gap-3 p-3 text-lg font-medium hover:bg-emerald-700 rounded-lg transition-colors duration-200"
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}

          <li className="pt-2">
            <hr className="border-emerald-700" />
          </li>

          {actionLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center gap-3 p-3 text-lg font-medium text-yellow-300 hover:bg-emerald-700 rounded-lg transition-colors duration-200"
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
