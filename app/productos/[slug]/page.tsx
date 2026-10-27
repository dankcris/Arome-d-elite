import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonAgregar } from "@/components/BotonAgregar";
import { buscar_producto, productos } from "@/data/productos";
import { formato_clp } from "@/lib/carrito";

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export default async function Producto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const producto = buscar_producto(slug);

  if (!producto) {
    notFound();
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-md-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" />
      </div>
      <div className="col-12 col-md-7">
        <span className="badge text-bg-secondary mb-2">{producto.categoria}</span>
        <h2>
          {producto.nombre} - {producto.marca}
        </h2>
        <p>{producto.descripcion}</p>
        <p className="fs-4">
          {producto.precio_oferta !== undefined ? (
            <>
              <span className="text-decoration-line-through text-muted me-2">
                {formato_clp(producto.precio)}
              </span>
              <span className="fw-bold text-danger">{formato_clp(producto.precio_oferta)}</span>
            </>
          ) : (
            <span className="fw-bold">{formato_clp(producto.precio)}</span>
          )}
        </p>
        <p className="text-muted">Stock disponible: {producto.stock}</p>
        <div className="d-flex gap-2">
          <BotonAgregar producto={producto} />
          <Link href="/productos" className="btn btn-outline-secondary btn-lg">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
