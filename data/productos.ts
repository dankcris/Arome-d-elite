// Datos de ejemplo de la tienda Arome d'elite.
// Precios de catálogo tomados de la versión HTML (parcial 1).
// stock y precio_oferta son valores de ejemplo para probar carrito y ofertas.

export type Categoria = "Masculinos" | "Femeninos" | "Unisex";

export type Producto = {
  id: number;
  slug: string;
  nombre: string;
  marca: string;
  categoria: Categoria;
  descripcion: string;
  precio: number;
  precio_oferta?: number;
  stock: number;
  imagen: string;
};

export const CATEGORIAS: Categoria[] = ["Masculinos", "Femeninos", "Unisex"];

export const IMAGEN_PORTADA =
  "https://imgs.search.brave.com/rtf3YOvazSQVKQg8BEKyce6ZvVsiVxEFuRMGhMm9nrk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5yZXZpc3RhZ3Eu/Y29tL3Bob3Rvcy82/NGY3MTUzNjQ2ODYz/YjUzZGNmYzgxMzQv/MToxL3dfNjQwLGNf/bGltaXQvTGFuZ2Fu/aGFsdGVuZGUtUGFy/ZnVtcy1BdWZtYWNo/ZXIuanBn";

export const productos: Producto[] = [
  {
    id: 1,
    slug: "sauvage-dior",
    nombre: "Sauvage",
    marca: "Dior",
    categoria: "Masculinos",
    descripcion: "Fragancia masculina de Dior.",
    precio: 89990,
    precio_oferta: 79990,
    stock: 10,
    imagen:
      "https://imgs.search.brave.com/8dcFHXEQYiEPBbmya4QF7yOIvi3UNOaa3EVQ5AQ_3d8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZiLzc2/LzNjL2ZiNzYzYzZm/YmVhZWFkMDVhZjZh/ZmZiMzI0MDVlYjQ5/LmpwZw",
  },
  {
    id: 2,
    slug: "bleu-de-chanel",
    nombre: "Bleu de Chanel",
    marca: "Chanel",
    categoria: "Masculinos",
    descripcion: "Fragancia masculina de Chanel.",
    precio: 95990,
    stock: 8,
    imagen:
      "https://imgs.search.brave.com/wxnfrsLA4X1MDTOEy5MXbUIcaSIiio5IuBd0FSvUoGg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy9mcy85YjE4MDcz/NjgxMzQ5My41NzJh/MjQxZDk0MTYyLmpw/Zw",
  },
  {
    id: 3,
    slug: "chanel-n5",
    nombre: "Chanel N°5",
    marca: "Chanel",
    categoria: "Femeninos",
    descripcion: "Fragancia femenina clásica de Chanel.",
    precio: 99990,
    stock: 6,
    imagen:
      "https://imgs.search.brave.com/r96K3bD6ZGziEsgPOVGlO2oGm-hzFDIgOGXoOkS15b8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE3/Njk2NzEzMjcxNDct/YmI0OWJjNDVlOWY2/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZhdXRv/PWZvcm1hdCZmaXQ9/Y3JvcCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE1UUjhmR05vWVc1/bGJDVXlNRzV2TGpW/OFpXNThNSHg4TUh4/OGZEQT0",
  },
  {
    id: 4,
    slug: "la-vie-est-belle",
    nombre: "La Vie Est Belle",
    marca: "Lancôme",
    categoria: "Femeninos",
    descripcion: "Fragancia femenina de Lancôme.",
    precio: 92990,
    stock: 12,
    imagen:
      "https://imgs.search.brave.com/oFo2vldtudnUnwqw5l7DsIAfX7E9JXe8B1eifmqk_es/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGFuY29tZS5jby51/ay9vbi9kZW1hbmR3/YXJlLnN0YXRpYy8t/L1NpdGVzLWxhbmNv/bWUtZW1lYS13ZXN0/LW5nLUxpYnJhcnkv/ZGVmYXVsdC9kd2Qz/MTQxYTMxL2ltYWdl/cy9wZHAvMDAwMjct/TEFDL2xhYy1sYS12/aWUtZXN0LWJlbGxl/LWVhdS1kZS1wYXJm/dW0tMTAwbWwtMzYx/NDI3Mzc0OTM4MV9U/T1BfMDIuanBn",
   },
      {
    id: 5,
    slug: "ck-one",
    nombre: "CK One",
    marca: "Calvin Klein",
    categoria: "Unisex",
    descripcion: "Fragancia unisex de Calvin Klein.",
    precio: 64990,
    precio_oferta: 54990,
    stock: 15,
        imagen: "/ck_one.webp",
  },
  ];

export function buscar_producto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}
