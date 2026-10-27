"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { CATEGORIAS } from "@/data/productos";
import type { Producto } from "@/data/productos";
import { useCarrito } from "@/components/CarritoProvider";
import { ProductoCard } from "@/components/ProductoCard";

type Props = {
  productos: Producto[];
  titulo?: string;
};

export function ListaProductos({ productos, titulo }: Props) {
  const { agregar } = useCarrito();
  const [categoria, setCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const filtrados: Producto[] = [];
  productos.forEach((producto) => {
    const coincideCategoria = categoria === "Todos" || producto.categoria === categoria;
    const texto = (producto.nombre + " " + producto.marca).toLowerCase();
    const coincideBusqueda = texto.includes(busqueda.trim().toLowerCase());
    if (coincideCategoria && coincideBusqueda) {
      filtrados.push(producto);
    }
  });

  const botones: ReactNode[] = [];
  ["Todos", ...CATEGORIAS].forEach((nombre) => {
    botones.push(
      <button
        type="button"
        key={nombre}
        className={categoria === nombre ? "btn btn-dark" : "btn btn-outline-dark"}
        aria-pressed={categoria === nombre}
        onClick={() => setCategoria(nombre)}
      >
        {nombre}
      </button>
    );
  });

  const tarjetas: ReactNode[] = [];
  filtrados.forEach((producto) => {
    tarjetas.push(
      <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
        <ProductoCard producto={producto} onAgregar={agregar} />
      </div>
    );
  });

  return (
    <section>
      {titulo && <h2 className="mb-3">{titulo}</h2>}
      <div className="row g-3 align-items-center mb-4">
        <div className="col-12 col-md-7">
          <div className="btn-group flex-wrap" role="group" aria-label="Filtrar por categoría">
            {botones}
          </div>
        </div>
        <div className="col-12 col-md-5">
          <input
            type="search"
            className="form-control"
            placeholder="Buscar perfume o marca"
            aria-label="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      {filtrados.length === 0 ? (
        <p className="alert alert-warning">No se encontraron productos.</p>
      ) : (
        <div className="row g-4">{tarjetas}</div>
      )}
    </section>
  );
}
