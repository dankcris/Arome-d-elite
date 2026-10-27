"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Producto } from "@/data/productos";
import {
  agregar_carrito,
  cambiar_cantidad,
  cargar_carrito,
  eliminar_del_carrito,
  guardar_carrito,
} from "@/lib/carrito";
import type { ItemCarrito } from "@/lib/carrito";

type ContextoCarrito = {
  carrito: ItemCarrito[];
  mensaje: string;
  agregar: (producto: Producto) => void;
  cambiar: (id: number, delta: number) => void;
  eliminar: (id: number) => void;
  vaciar: () => void;
  cerrarMensaje: () => void;
};

const Contexto = createContext<ContextoCarrito | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [cargado, setCargado] = useState(false);

  // al montar se lee el carrito guardado
  useEffect(() => {
    // se lee localStorage recién después de montar (evita diferencias con el HTML del servidor)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCarrito(cargar_carrito());
    setCargado(true);
  }, []);

  // cada cambio se guarda (solo después de la lectura inicial)
  useEffect(() => {
    if (cargado) {
      guardar_carrito(carrito);
    }
  }, [carrito, cargado]);

  function agregar(producto: Producto) {
    const resultado = agregar_carrito(carrito, producto);
    setCarrito(resultado.carrito);
    setMensaje(resultado.mensaje);
  }

  function cambiar(id: number, delta: number) {
    setCarrito(cambiar_cantidad(carrito, id, delta));
  }

  function eliminar(id: number) {
    setCarrito(eliminar_del_carrito(carrito, id));
  }

  function vaciar() {
    setCarrito([]);
  }

  function cerrarMensaje() {
    setMensaje("");
  }

  return (
    <Contexto.Provider
      value={{ carrito, mensaje, agregar, cambiar, eliminar, vaciar, cerrarMensaje }}
    >
      {children}
    </Contexto.Provider>
  );
}

export function useCarrito(): ContextoCarrito {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return contexto;
}
