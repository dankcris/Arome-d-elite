import { cleanup } from "@testing-library/react";

// limpia el DOM después de cada prueba
afterEach(() => {
  cleanup();
  localStorage.clear();
});

// carga todas las pruebas *.spec.ts / *.spec.tsx de esta carpeta
const contexto = require.context("./", true, /\.spec\.tsx?$/);
contexto.keys().forEach(contexto);
