"use client";

import type { Producto } from "@/data/productos";
import { useCarrito } from "@/components/CarritoProvider";

export function BotonAgregar({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();
  return (
    <button
      type="button"
      className="btn btn-dark btn-lg"
      disabled={producto.stock <= 0}
      onClick={() => agregar(producto)}
    >
      Agregar al carrito
    </button>
  );
}
