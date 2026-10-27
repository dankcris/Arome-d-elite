"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCarrito } from "@/components/CarritoProvider";
import { calcular_total, formato_clp, precio_actual } from "@/lib/carrito";

export function TablaCarrito() {
  const { carrito, cambiar, eliminar, vaciar } = useCarrito();

  function confirmar_eliminar(id: number) {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto del carrito?")) {
      eliminar(id);
    }
  }

  if (carrito.length === 0) {
    return (
      <div className="alert alert-secondary">
        Tu carrito está vacío. <Link href="/productos">Ver productos</Link>
      </div>
    );
  }

  const filas: ReactNode[] = [];
  carrito.forEach((item) => {
    const precio = precio_actual(item);
    filas.push(
      <tr key={item.id}>
        <td>{item.nombre}</td>
        <td>{formato_clp(precio)}</td>
        <td>
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              aria-label={"Quitar una unidad de " + item.nombre}
              onClick={() => cambiar(item.id, -1)}
            >
              -
            </button>
            <span className="mx-2" data-testid={"cantidad-" + item.id}>{item.cantidad}</span>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              aria-label={"Agregar una unidad de " + item.nombre}
              disabled={item.cantidad >= item.stock}
              onClick={() => cambiar(item.id, 1)}
            >
              +
            </button>
          </div>
        </td>
        <td>{formato_clp(precio * item.cantidad)}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => confirmar_eliminar(item.id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end fw-bold">Total</td>
              <td colSpan={2} className="fw-bold" data-testid="total-tabla">
                {formato_clp(calcular_total(carrito))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="text-end">
        <button type="button" className="btn btn-secondary" onClick={vaciar}>
          Limpiar
        </button>
      </div>
    </div>
  );
}
