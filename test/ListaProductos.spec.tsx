import { fireEvent, render, screen } from "@testing-library/react";
import { CarritoProvider } from "@/components/CarritoProvider";
import { ListaProductos } from "@/components/ListaProductos";
import { productos } from "@/data/productos";

function dibujar(lista = productos) {
  return render(
    <CarritoProvider>
      <ListaProductos productos={lista} titulo="Nuestros perfumes" />
    </CarritoProvider>
  );
}

describe("ListaProductos", () => {
  it("muestra el título y todos los productos por defecto", () => {
    dibujar();
    expect(screen.getByText("Nuestros perfumes")).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "Agregar al carrito" }).length).toBe(
      productos.length
    );
  });

  it("filtra por categoría al presionar un botón (estado)", () => {
    dibujar();
    fireEvent.click(screen.getByRole("button", { name: "Femeninos" }));
    expect(screen.getByText("Chanel N°5")).toBeTruthy();
    expect(screen.queryByText("Sauvage")).toBeNull();
    expect(screen.getByRole("button", { name: "Femeninos" }).getAttribute("aria-pressed")).toBe(
      "true"
    );
  });

  it("filtra por texto de búsqueda en nombre o marca", () => {
    dibujar();
    fireEvent.change(screen.getByLabelText("Buscar"), { target: { value: "dior" } });
    expect(screen.getByText("Sauvage")).toBeTruthy();
    expect(screen.queryByText("CK One")).toBeNull();
  });

  it("muestra un aviso cuando no hay resultados", () => {
    dibujar();
    fireEvent.change(screen.getByLabelText("Buscar"), { target: { value: "zzzz" } });
    expect(screen.getByText("No se encontraron productos.")).toBeTruthy();
  });

  it("volver a 'Todos' restaura la lista completa", () => {
    dibujar();
    fireEvent.click(screen.getByRole("button", { name: "Unisex" }));
    fireEvent.click(screen.getByRole("button", { name: "Todos" }));
    expect(screen.getAllByRole("button", { name: "Agregar al carrito" }).length).toBe(
      productos.length
    );
  });
});
