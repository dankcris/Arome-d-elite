import { ListaProductos } from "@/components/ListaProductos";
import { productos } from "@/data/productos";

export default function Productos() {
  return <ListaProductos productos={productos} titulo="Nuestros perfumes" />;
}
