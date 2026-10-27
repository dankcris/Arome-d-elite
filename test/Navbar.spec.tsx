import { act, fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";
import { CarritoProvider, useCarrito } from "@/components/CarritoProvider";
import { fijarRuta } from "./mocks/next-navigation";
import { chanel5 } from "./datos";

function AgregarDePrueba() {
  const { agregar } = useCarrito();
  return <button onClick={() => agregar(chanel5)}>agregar-prueba</button>;
}

function dibujar() {
  return render(
    <CarritoProvider>
      <Navbar />
      <AgregarDePrueba />
    </CarritoProvider>
  );
}

describe("Navbar", () => {
  beforeEach(() => fijarRuta("/"));

  it("muestra la marca y los enlaces de navegación", () => {
    dibujar();
    expect(screen.getByText("Arome d'elite")).toBeTruthy();
    ["Inicio", "Productos", "Ofertas", "Nosotros", "Contacto"].forEach((texto) => {
      expect(screen.getByRole("link", { name: texto })).toBeTruthy();
    });
  });

  it("marca como activo el enlace de la ruta actual (mock de usePathname)", () => {
    fijarRuta("/ofertas");
    dibujar();
    expect(screen.getByRole("link", { name: "Ofertas" }).className).toContain("active");
    expect(screen.getByRole("link", { name: "Inicio" }).className).not.toContain("active");
  });

  it("el botón hamburguesa abre y cierra el menú (estado)", () => {
    dibujar();
    const menu = document.getElementById("menu-principal") as HTMLElement;
    const boton = screen.getByRole("button", { name: "Abrir menú" });
    expect(menu.className).not.toContain("show");
    fireEvent.click(boton);
    expect(menu.className).toContain("show");
    expect(boton.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(boton);
    expect(menu.className).not.toContain("show");
  });

  it("cerrar el menú al elegir un enlace", () => {
    dibujar();
    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    fireEvent.click(screen.getByRole("link", { name: "Contacto" }));
    expect((document.getElementById("menu-principal") as HTMLElement).className).not.toContain(
      "show"
    );
  });

  it("el contador y el total del carrito reaccionan al agregar productos", () => {
    dibujar();
    expect(screen.getByTestId("cantidad-carrito").textContent).toBe("0");
    expect(screen.getByTestId("total-carrito").textContent).toBe("$0");
    act(() => {
      fireEvent.click(screen.getByText("agregar-prueba"));
    });
    expect(screen.getByTestId("cantidad-carrito").textContent).toBe("1");
    expect(screen.getByTestId("total-carrito").textContent).toBe("$99.990");
  });
});
