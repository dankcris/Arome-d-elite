# Arome d'elite — Evaluación Parcial 2 (DSY1104 Desarrollo Fullstack II)

Tienda de perfumes con **Next.js + React**, diseño responsivo con **Bootstrap 5** y pruebas unitarias con **Jasmine + Karma**.
Integrantes: Tomás González, Matías Noriega, Matías Obreque.

## Comandos

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # build de producción
npm test               # Karma + Jasmine en Chrome headless
npm run test:jsdom     # lo mismo sin Chrome instalado (jsdom)
npm run test:cov       # pruebas + cobertura (carpeta coverage/)
npm run lint
npm run typecheck
```

El reporte HTML de cobertura queda en `coverage/html/index.html`.

## Estructura

```
app/            páginas (Inicio, Productos, Productos/[slug], Ofertas, Nosotros, Contacto, Carrito)
components/     Navbar, Footer, ProductoCard, ListaProductos, FormularioContacto,
                TablaCarrito, BotonAgregar, AvisoCarrito, CarritoProvider (estado global del carrito)
lib/            carrito.ts (lógica del carrito + localStorage), validaciones.ts
data/           productos.ts (catálogo)
test/           *.spec.ts(x) + mocks (next/link, next/navigation) + datos de prueba
karma.conf.cjs  configuración de Karma (webpack + Babel + cobertura)
```

## Dónde está cada punto de la rúbrica

| Indicador | Dónde verlo |
|---|---|
| IE2.1.1 Framework JS (React/Next) | `app/`, `components/`, `next.config.ts` |
| IE2.1.2 Props, estados y Bootstrap | `ProductoCard` (props), `ListaProductos` (estado: filtro y búsqueda), `Navbar` (estado del menú), `CarritoProvider` (estado global), clases `row`, `col-*`, `navbar-expand-lg`, `table-responsive` |
| IE2.2.1 Pruebas Jasmine + Karma | `test/*.spec.ts(x)` (64 pruebas) |
| IE2.3.1 Proceso de testeo | `karma.conf.cjs`, `test/index.ts`, mocks en `test/mocks/`, `npm run test:cov` |
| Documentos | ERS y Cobertura de testing (entregados aparte) |

## Qué se mantuvo del parcial 1

Textos, productos, precios, imágenes, video, enlaces de Instagram y Gmail, y las funciones
`validar_texto`, `validar_correo`, `agregar_carrito` y los mensajes del formulario de contacto.
La lógica del carrito (stock, +/-, eliminar con confirmación, localStorage) se tomó de la base HTML (Anexo 3).
