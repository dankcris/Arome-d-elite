import { CATEGORIAS, buscar_producto, productos } from "@/data/productos";

describe("data/productos", () => {
  it("buscar_producto encuentra un producto por su slug", () => {
    expect(buscar_producto("chanel-n5")?.nombre).toBe("Chanel N°5");
  });

  it("buscar_producto devuelve undefined si el slug no existe", () => {
    expect(buscar_producto("no-existe")).toBeUndefined();
  });

  it("todos los productos tienen una categoría válida y slug único", () => {
    const slugs = productos.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(productos.length);
    productos.forEach((p) => expect(CATEGORIAS).toContain(p.categoria));
  });
});
