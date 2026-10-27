"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { validar_formulario } from "@/lib/validaciones";
import type { ErroresContacto } from "@/lib/validaciones";

export type DatosContacto = { nombre: string; correo: string; mensaje: string };

type Props = {
  onEnviar?: (datos: DatosContacto) => void;
};

export function FormularioContacto({ onEnviar }: Props) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [resultado, setResultado] = useState("");

  function limpiar() {
    setNombre("");
    setCorreo("");
    setMensaje("");
    setErrores({});
    setResultado("");
  }

  function procesar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResultado("");
    const nuevos = validar_formulario(nombre, correo, mensaje);
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) {
      return;
    }
    if (onEnviar) {
      onEnviar({ nombre, correo, mensaje });
    }
    setResultado("Gracias " + nombre + ", tu mensaje fue enviado correctamente.");
    setNombre("");
    setCorreo("");
    setMensaje("");
  }

  return (
    <form onSubmit={procesar} noValidate aria-label="Formulario de contacto">
      <div className="mb-3">
        <label htmlFor="campo_nombre" className="form-label">Nombre:</label>
        <input
          id="campo_nombre"
          type="text"
          className={errores.nombre ? "form-control is-invalid" : "form-control"}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <div className="invalid-feedback">{errores.nombre}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="campo_correo" className="form-label">Correo:</label>
        <input
          id="campo_correo"
          type="text"
          className={errores.correo ? "form-control is-invalid" : "form-control"}
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <div className="invalid-feedback">{errores.correo}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="campo_mensaje" className="form-label">Mensaje:</label>
        <textarea
          id="campo_mensaje"
          rows={4}
          className={errores.mensaje ? "form-control is-invalid" : "form-control"}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
        <div className="invalid-feedback">{errores.mensaje}</div>
      </div>
      <div className="d-flex gap-2">
        <button type="button" className="btn btn-outline-secondary" onClick={limpiar}>
          Limpiar
        </button>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </div>
      {resultado && (
        <p className="alert alert-success mt-3" role="status">
          {resultado}
        </p>
      )}
    </form>
  );
}
