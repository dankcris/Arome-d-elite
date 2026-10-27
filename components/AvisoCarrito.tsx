"use client";

import { useCarrito } from "@/components/CarritoProvider";

export function AvisoCarrito() {
  const { mensaje, cerrarMensaje } = useCarrito();
  if (!mensaje) {
    return null;
  }
  return (
    <div className="container mt-3">
      <div className="alert alert-info alert-dismissible mb-0" role="status">
        {mensaje}
        <button
          type="button"
          className="btn-close"
          aria-label="Cerrar"
          onClick={cerrarMensaje}
        ></button>
      </div>
    </div>
  );
}
