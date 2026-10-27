import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("muestra los derechos reservados y los enlaces a Instagram y Gmail", () => {
    render(<Footer />);
    expect(screen.getByText("Arome d'elite - Todos los derechos reservados")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Instagram" }).getAttribute("href")).toBe(
      "https://instagram.com/arome.d.elite"
    );
    expect(screen.getByRole("link", { name: "Gmail" }).getAttribute("href")).toBe(
      "mailto:contacto.aromedelite@gmail.com"
    );
  });
});