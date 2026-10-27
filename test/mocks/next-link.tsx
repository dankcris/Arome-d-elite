// Mock de next/link: un <a> simple. Evita la navegación real (como hace el router de Next)
// para que Karma no recargue la página durante las pruebas.
import type { MouseEvent, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  [clave: string]: unknown;
};

export default function Link({ href, children, onClick, ...resto }: Props) {
  function alHacerClic(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  }
  return (
    <a href={href} onClick={alHacerClic} {...resto}>
      {children}
    </a>
  );
}
