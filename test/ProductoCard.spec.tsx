import { fireEvent, render, screen } from "@testing-library/react";
import { ProductoCard } from "@/components/ProductoCard";
import { agotado, chanel5, sauvage } from "./datos";

describe("ProductoCard", () => {
  it("muestra nombre, marca, categoría e imagen", () => {
    render(<ProductoCard producto={chanel5} onAgregar={() => {}} />);
    expect(screen.getByText("Chanel N°5")).toBeTruthy();
    expect(screen.getByText("Chanel")).toBeTruthy();
    expect(screen.getByText("Femeninos")).toBeTruthy();
    expect(screen.getByAltText("Chanel N°5")).toBeTruthy();
  });

  it("muestra el precio normal cuando no hay oferta", () => {
    render(<ProductoCard producto={chanel5} onAgregar={() => {}} />);
    expect(screen.getByText("$99.990")).toBeTruthy();
  });

  it("muestra el precio tachado y el de oferta cuando hay oferta", () => {
    render(<ProductoCard producto={sauvage} onAgregar={() => {}} />);
    const tachado = screen.getByText("$89.990");
    expect(tachado.className).toContain("text-decoration-line-through");
    expect(screen.getByText("$79.990")).toBeTruthy();
  });

  it("enlaza al detalle del producto usando el slug", () => {
    render(<ProductoCard producto={chanel5} onAgregar={() => {}} />);
    const enlace = screen.getByRole("link", { name: "Chanel N°5" });
    expect(enlace.getAttribute("href")).toBe("/productos/chanel-n5");
  });

  it("llama a onAgregar con el producto al hacer clic (spy)", () => {
    const onAgregar = jasmine.createSpy("onAgregar");
    render(<ProductoCard producto={chanel5} onAgregar={onAgregar} />);
    fireEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith(chanel5);
  });

  it("deshabilita el botón cuando no hay stock", () => {
    const onAgregar = jasmine.createSpy("onAgregar");
    render(<ProductoCard producto={agotado} onAgregar={onAgregar} />);
    const boton = screen.getByRole("button", { name: "Sin stock" }) as HTMLButtonElement;
    expect(boton.disabled).toBeTrue();
    fireEvent.click(boton);
    expect(onAgregar).not.toHaveBeenCalled();
  });
});
