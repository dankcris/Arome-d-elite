// Mock de next/navigation: la ruta actual se controla desde las pruebas.
let rutaActual = "/";

export function fijarRuta(ruta: string) {
  rutaActual = ruta;
}

export function usePathname() {
  return rutaActual;
}

export function notFound() {
  throw new Error("NEXT_NOT_FOUND");
}
