import { fireEvent, render, screen } from "@testing-library/react";
import { FormularioContacto } from "@/components/FormularioContacto";

function escribir(etiqueta: string, valor: string) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

describe("FormularioContacto", () => {
  it("muestra los tres errores cuando se envía vacío", () => {
    render(<FormularioContacto />);
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByText("Debe ingresar su nombre")).toBeTruthy();
    expect(screen.getByText("Debe ingresar un correo válido")).toBeTruthy();
    expect(screen.getByText("Debe escribir un mensaje")).toBeTruthy();
  });

  it("marca los campos inválidos con la clase is-invalid de Bootstrap", () => {
    render(<FormularioContacto />);
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByLabelText("Nombre:").className).toContain("is-invalid");
  });

  it("rechaza un correo con formato inválido", () => {
    render(<FormularioContacto />);
    escribir("Nombre:", "Ana");
    escribir("Correo:", "ana-sin-arroba");
    escribir("Mensaje:", "Hola");
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByText("Debe ingresar un correo válido")).toBeTruthy();
    expect(screen.queryByText("Debe ingresar su nombre")).toBeNull();
  });

  it("con datos válidos llama a onEnviar (spy) y muestra el agradecimiento", () => {
    const onEnviar = jasmine.createSpy("onEnviar");
    render(<FormularioContacto onEnviar={onEnviar} />);
    escribir("Nombre:", "Ana");
    escribir("Correo:", "ana@mail.cl");
    escribir("Mensaje:", "Quiero un perfume");
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(onEnviar).toHaveBeenCalledWith({
      nombre: "Ana",
      correo: "ana@mail.cl",
      mensaje: "Quiero un perfume",
    });
    expect(screen.getByText("Gracias Ana, tu mensaje fue enviado correctamente.")).toBeTruthy();
  });

  it("vacía los campos después de un envío correcto", () => {
    render(<FormularioContacto />);
    escribir("Nombre:", "Ana");
    escribir("Correo:", "ana@mail.cl");
    escribir("Mensaje:", "Hola");
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect((screen.getByLabelText("Nombre:") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Mensaje:") as HTMLTextAreaElement).value).toBe("");
  });

  it("Limpiar borra campos, errores y resultado", () => {
    render(<FormularioContacto />);
    escribir("Nombre:", "Ana");
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    fireEvent.click(screen.getByRole("button", { name: "Limpiar" }));
    expect((screen.getByLabelText("Nombre:") as HTMLInputElement).value).toBe("");
    expect(screen.getByLabelText("Correo:").className).not.toContain("is-invalid");
  });
});
