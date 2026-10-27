import { fireEvent, render, screen } from "@testing-library/react";
import { AvisoCarrito } from "@/components/AvisoCarrito";
import { CarritoProvider, useCarrito } from "@/components/CarritoProvider";
import { TablaCarrito } from "@/components/TablaCarrito";
import { agregar_carrito, guardar_carrito } from "@/lib/carrito";
import { chanel5, sauvage } from "./datos";

function Botones() {
  const { agregar } = useCarrito();
  return (
    <>
      <button onClick={() => agregar(sauvage)}>add-sauvage</button>
      <button onClick={() => agregar(chanel5)}>add-chanel</button>
    </>
  );
}

function dibujar() {
  return render(
    <CarritoProvider>
      <AvisoCarrito />
      <Botones />
      <TablaCarrito />
    </CarritoProvider>
  );
}

describe("TablaCarrito + CarritoProvider", () => {
  it("muestra un mensaje cuando el carrito está vacío", () => {
    dibujar();
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy();
  });

  it("agrega productos y calcula el total con precios de oferta", () => {
    dibujar();
    fireEvent.click(screen.getByText("add-sauvage"));
    fireEvent.click(screen.getByText("add-chanel"));
    expect(screen.getByTestId("total-tabla").textContent).toBe("$179.980");
  });

  it("el botón + aumenta la cantidad y se bloquea al llegar al stock", () => {
    dibujar();
    fireEvent.click(screen.getByText("add-sauvage"));
    const mas = screen.getByRole("button", { name: "Agregar una unidad de Sauvage" }) as HTMLButtonElement;
    fireEvent.click(mas);
    expect(screen.getByTestId("cantidad-1").textContent).toBe("2");
    expect(mas.disabled).toBeTrue();
  });

  it("el botón - disminuye y elimina la fila al llegar a 0", () => {
    dibujar();
    fireEvent.click(screen.getByText("add-chanel"));
    fireEvent.click(screen.getByRole("button", { name: "Quitar una unidad de Chanel N°5" }));
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy();
  });

  it("Eliminar pide confirmación (mock de window.confirm) y elimina si se acepta", () => {
    const confirmar = spyOn(window, "confirm").and.returnValue(true);
    dibujar();
    fireEvent.click(screen.getByText("add-chanel"));
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(confirmar).toHaveBeenCalledWith(
      "¿Estás seguro de que deseas eliminar este producto del carrito?"
    );
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy();
  });

  it("Eliminar no hace nada si se cancela la confirmación", () => {
    spyOn(window, "confirm").and.returnValue(false);
    dibujar();
    fireEvent.click(screen.getByText("add-chanel"));
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(screen.getByTestId("cantidad-3").textContent).toBe("1");
  });

  it("Limpiar vacía todo el carrito", () => {
    dibujar();
    fireEvent.click(screen.getByText("add-chanel"));
    fireEvent.click(screen.getByRole("button", { name: "Limpiar" }));
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy();
  });

  it("muestra el aviso de stock y se puede cerrar", () => {
    dibujar();
    fireEvent.click(screen.getByText("add-sauvage"));
    fireEvent.click(screen.getByText("add-sauvage"));
    fireEvent.click(screen.getByText("add-sauvage"));
    expect(screen.getByRole("status").textContent).toContain("No puedes añadir más de 2 unidades");
    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("carga el carrito guardado en localStorage al iniciar", () => {
    guardar_carrito(agregar_carrito([], chanel5).carrito);
    dibujar();
    expect(screen.getByTestId("cantidad-3").textContent).toBe("1");
  });

  it("guarda el carrito en localStorage al cambiar (spy sobre setItem)", () => {
    dibujar();
    const espia = spyOn(Storage.prototype, "setItem").and.callThrough();
    fireEvent.click(screen.getByText("add-chanel"));
    expect(espia).toHaveBeenCalledWith("carrito", jasmine.stringContaining("Chanel N°5"));
  });

  it("useCarrito lanza un error fuera del provider", () => {
    spyOn(console, "error");
    expect(() => render(<Botones />)).toThrowError(/CarritoProvider/);
  });
});
