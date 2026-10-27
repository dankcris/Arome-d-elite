import { fireEvent, render, screen } from "@testing-library/react";
import { AvisoCarrito } from "@/components/AvisoCarrito";
import { BotonAgregar } from "@/components/BotonAgregar";
import { CarritoProvider } from "@/components/CarritoProvider";
import { agotado, chanel5 } from "./datos";

describe("BotonAgregar", () => {
  it("agrega el producto al carrito y muestra el aviso", () => {
    render(
      <CarritoProvider>
        <AvisoCarrito />
        <BotonAgregar producto={chanel5} />
      </CarritoProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    expect(screen.getByRole("status").textContent).toContain("Chanel N°5 agregado al carrito.");
  });

  it("queda deshabilitado cuando el producto no tiene stock", () => {
    render(
      <CarritoProvider>
        <BotonAgregar producto={agotado} />
      </CarritoProvider>
    );
    const boton = screen.getByRole("button", { name: "Agregar al carrito" }) as HTMLButtonElement;
    expect(boton.disabled).toBeTrue();
  });
});