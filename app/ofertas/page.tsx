import { ListaProductos } from "@/components/ListaProductos";
import { productos } from "@/data/productos";

const Ofertas = () => {
  const enOferta = productos.filter((p) => p.precio_oferta !== undefined);
  return <ListaProductos productos={enOferta} titulo="Ofertas" />;
};

export default Ofertas;
