import { FormularioContacto } from "@/components/FormularioContacto";

export default function Contacto() {
  return (
    <>
      <section className="mb-4">
        <h2>Conoce una reseña de nuestros productos a traves del perfumista Andres perfume</h2>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/n20ihQY4P2E"
            title="Video promocional Arome d'elite"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section>
        <h2>Contáctanos</h2>
        <FormularioContacto />
      </section>
    </>
  );
}
