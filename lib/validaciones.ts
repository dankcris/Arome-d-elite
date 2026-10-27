// Validaciones del formulario de contacto (misma lógica del parcial 1)

export function validar_texto(valor: string): boolean {
  if (valor.trim().length == 0) {
    return false;
  }
  return true;
}

export function validar_correo(valor: string): boolean {
  if (valor.trim().length == 0) {
    return false;
  }
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(valor);
}

export type ErroresContacto = {
  nombre?: string;
  correo?: string;
  mensaje?: string;
};

export function validar_formulario(
  nombre: string,
  correo: string,
  mensaje: string
): ErroresContacto {
  const errores: ErroresContacto = {};
  if (!validar_texto(nombre)) {
    errores.nombre = "Debe ingresar su nombre";
  }
  if (!validar_correo(correo)) {
    errores.correo = "Debe ingresar un correo válido";
  }
  if (!validar_texto(mensaje)) {
    errores.mensaje = "Debe escribir un mensaje";
  }
  return errores;
}
