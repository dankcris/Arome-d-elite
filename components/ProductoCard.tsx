"use client";

import Link from "next/link";
import type { Producto } from "@/data/productos";
import { formato_clp } from "@/lib/carrito";

type Props = {
  producto: Producto;
  onAgregar: (producto: Producto) => void;
};

export function ProductoCard({ producto, onAgregar }: Props) {
  const sinStock = producto.stock <= 0;
  return (
    <div className="card h-100 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={producto.imagen} className="card-img-top img-producto" alt={producto.nombre} />
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-secondary align-self-start mb-2">
          {producto.categoria}
        </span>
        <h3 className="h5 card-title">
          <Link href={"/productos/" + producto.slug}>{producto.nombre}</Link>
        </h3>
        <p className="text-muted small mb-2">{producto.marca}</p>
        <div className="mb-3">
          {producto.precio_oferta !== undefined ? (
            <>
              <span className="text-decoration-line-through text-muted me-2">
                {formato_clp(producto.precio)}
              </span>
              <span className="fw-bold text-danger">{formato_clp(producto.precio_oferta)}</span>
            </>
          ) : (
            <span className="fw-bold">{formato_clp(producto.precio)}</span>
          )}
        </div>
        <small className="text-muted">Stock disponible: {producto.stock}</small>
        <button
          type="button"
          className="btn btn-dark mt-auto"
          disabled={sinStock}
          onClick={() => onAgregar(producto)}
        >
          {sinStock ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
