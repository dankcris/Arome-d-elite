import type { Producto } from "@/data/productos";

export type ItemCarrito = Producto & { cantidad: number };

export type ResultadoCarrito = { carrito: ItemCarrito[]; mensaje: string };

const CLAVE = "carrito";

export function precio_actual(producto: Producto): number {
  return producto.precio_oferta ?? producto.precio;
}

export function formato_clp(valor: number): string {
  return "$" + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function agregar_carrito(
  carrito: ItemCarrito[],
  producto: Producto
): ResultadoCarrito {
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    if (existente.cantidad >= producto.stock) {
      return {
        carrito,
        mensaje: `No puedes añadir más de ${producto.stock} unidades de ${producto.nombre}.`,
      };
    }
    const nuevo = carrito.map((item) =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    return { carrito: nuevo, mensaje: `${producto.nombre} agregado al carrito.` };
  }

  if (producto.stock <= 0) {
    return { carrito, mensaje: `${producto.nombre} no tiene stock disponible.` };
  }
  return {
    carrito: [...carrito, { ...producto, cantidad: 1 }],
    mensaje: `${producto.nombre} agregado al carrito.`,
  };
}

export function cambiar_cantidad(
  carrito: ItemCarrito[],
  id: number,
  delta: number
): ItemCarrito[] {
  const lista: ItemCarrito[] = [];
  carrito.forEach((item) => {
    if (item.id !== id) {
      lista.push(item);
      return;
    }
    const cantidad = item.cantidad + delta;
    if (cantidad <= 0) {
      return;
    }
    if (cantidad > item.stock) {
      lista.push(item);
      return;
    }
    lista.push({ ...item, cantidad });
  });
  return lista;
}

export function eliminar_del_carrito(
  carrito: ItemCarrito[],
  id: number
): ItemCarrito[] {
  return carrito.filter((item) => item.id !== id);
}

export function calcular_total(carrito: ItemCarrito[]): number {
  let total = 0;
  carrito.forEach((item) => {
    total = total + precio_actual(item) * item.cantidad;
  });
  return total;
}

export function contar_items(carrito: ItemCarrito[]): number {
  let cantidad = 0;
  carrito.forEach((item) => {
    cantidad = cantidad + item.cantidad;
  });
  return cantidad;
}

export function guardar_carrito(carrito: ItemCarrito[]): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(carrito));
  } catch {
    // sin almacenamiento disponible: se ignora
  }
}

export function cargar_carrito(): ItemCarrito[] {
  try {
    const texto = localStorage.getItem(CLAVE);
    const datos = texto ? JSON.parse(texto) : [];
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}
