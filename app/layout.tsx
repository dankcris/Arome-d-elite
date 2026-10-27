import type { Metadata } from "next";
import type { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CarritoProvider } from "@/components/CarritoProvider";
import { Navbar } from "@/components/Navbar";
import { AvisoCarrito } from "@/components/AvisoCarrito";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Arome d'elite",
  description: "La esencia de tu personalidad. Perfumes masculinos, femeninos y unisex.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="d-flex flex-column min-vh-100">
        <CarritoProvider>
          <Navbar />
          <AvisoCarrito />
          <main className="container my-4 flex-grow-1">
            <div className="contenido">{children}</div>
          </main>
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
