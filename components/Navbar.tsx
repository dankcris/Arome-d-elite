"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { useCarrito } from "@/components/CarritoProvider";
import { calcular_total, contar_items, formato_clp } from "@/lib/carrito";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/productos", texto: "Productos" },
  { href: "/ofertas", texto: "Ofertas" },
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/contacto", texto: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const { carrito } = useCarrito();
  const [abierto, setAbierto] = useState(false);

  const items: ReactNode[] = [];
  enlaces.forEach((enlace) => {
    const activo = pathname === enlace.href;
    items.push(
      <li className="nav-item" key={enlace.href}>
        <Link
          className={activo ? "nav-link active" : "nav-link"}
          href={enlace.href}
          aria-current={activo ? "page" : undefined}
          onClick={() => setAbierto(false)}
        >
          {enlace.texto}
        </Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-arome">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Arome d&apos;elite
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={abierto ? "collapse navbar-collapse show" : "collapse navbar-collapse"}
          id="menu-principal"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">{items}</ul>
          <Link className="btn btn-warning" href="/carrito">
            Carrito{" "}
            <span className="badge text-bg-dark" data-testid="cantidad-carrito">
              {contar_items(carrito)}
            </span>{" "}
            <span data-testid="total-carrito">{formato_clp(calcular_total(carrito))}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
