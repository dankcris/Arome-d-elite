import Link from "next/link";
import { IMAGEN_PORTADA, buscar_producto } from "@/data/productos";
import { formato_clp } from "@/lib/carrito";

export default function Home() {
  const destacado = buscar_producto("sauvage-dior");
  return (
    <>
      <section className="row align-items-center g-4 mb-4">
        <div className="col-12 col-md-6">
          <h1>Bienvenido a Arome d&apos;elite</h1>
          <p className="lead">
            La esencia de tu personalidad. Encuentra perfumes masculinos, femeninos y unisex de
            las mejores marcas.
          </p>
          <Link href="/productos" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
        <div className="col-12 col-md-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGEN_PORTADA} alt="Perfumes en exhibición" className="img-fluid rounded" />
        </div>
      </section>

      <section className="mb-4">
        <h2>Nuestra historia</h2>
        <p>
          Arome d&apos;elite nació en el año 2012 con el objetivo de darle a nuestros clientes
          fragancias de diseñador con aromas de elite. Hoy contamos con una sucursal en Mall
          Parque Arauco y tambien via online.
        </p>
      </section>

      {destacado && (
        <section>
          <h2>Producto destacado</h2>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0 align-items-center">
              <div className="col-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={destacado.imagen} alt="Sauvage Dior" className="img-fluid rounded-start" />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h3 className="h5 card-title">
                    {destacado.nombre} - {destacado.marca}
                  </h3>
                  <p className="card-text fw-bold">{formato_clp(destacado.precio)}</p>
                  <Link href="/productos" className="card-link">
                    Ver todos los productos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
