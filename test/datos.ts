import type { Producto } from "@/data/productos";

export const sauvage: Producto = {
  id: 1,
  slug: "sauvage-dior",
  nombre: "Sauvage",
  marca: "Dior",
  categoria: "Masculinos",
  descripcion: "Fragancia masculina de Dior.",
  precio: 89990,
  precio_oferta: 79990,
  stock: 2,
  imagen: "sauvage.jpg",
};

export const chanel5: Producto = {
  id: 3,
  slug: "chanel-n5",
  nombre: "Chanel N°5",
  marca: "Chanel",
  categoria: "Femeninos",
  descripcion: "Fragancia femenina clásica de Chanel.",
  precio: 99990,
  stock: 6,
  imagen: "chanel5.jpg",
};

export const agotado: Producto = {
  id: 9,
  slug: "agotado",
  nombre: "Agotado",
  marca: "Marca",
  categoria: "Unisex",
  descripcion: "Sin stock.",
  precio: 50000,
  stock: 0,
  imagen: "agotado.jpg",
};
