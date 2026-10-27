import { validar_correo, validar_formulario, validar_texto } from "@/lib/validaciones";

describe("lib/validaciones", () => {
  it("validar_texto rechaza vacío y solo espacios", () => {
    expect(validar_texto("")).toBeFalse();
    expect(validar_texto("   ")).toBeFalse();
  });

  it("validar_texto acepta texto", () => {
    expect(validar_texto("Tomás")).toBeTrue();
  });

  it("validar_correo acepta un correo válido", () => {
    expect(validar_correo("contacto.aromedelite@gmail.com")).toBeTrue();
  });

  it("validar_correo rechaza correos mal escritos", () => {
    expect(validar_correo("sin-arroba.cl")).toBeFalse();
    expect(validar_correo("a@b")).toBeFalse();
    expect(validar_correo("a b@c.cl")).toBeFalse();
  });

  it("validar_correo rechaza vacío", () => {
    expect(validar_correo("  ")).toBeFalse();
  });

  it("validar_formulario devuelve un error por cada campo inválido", () => {
    expect(validar_formulario("", "x", " ")).toEqual({
      nombre: "Debe ingresar su nombre",
      correo: "Debe ingresar un correo válido",
      mensaje: "Debe escribir un mensaje",
    });
  });

  it("validar_formulario devuelve {} cuando todo está correcto", () => {
    expect(validar_formulario("Ana", "ana@mail.cl", "Hola")).toEqual({});
  });
});
