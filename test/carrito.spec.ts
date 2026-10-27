import {
  agregar_carrito,
  calcular_total,
  cambiar_cantidad,
  cargar_carrito,
  contar_items,
  eliminar_del_carrito,
  formato_clp,
  guardar_carrito,
  precio_actual,
} from "@/lib/carrito";
import { agotado, chanel5, sauvage } from "./datos";

describe("lib/carrito", () => {
  describe("formato y precios", () => {
    it("formato_clp separa los miles con punto", () => {
      expect(formato_clp(89990)).toBe("$89.990");
      expect(formato_clp(1250000)).toBe("$1.250.000");
      expect(formato_clp(500)).toBe("$500");
    });

    it("precio_actual usa el precio de oferta cuando existe", () => {
      expect(precio_actual(sauvage)).toBe(79990);
      expect(precio_actual(chanel5)).toBe(99990);
    });
  });

  describe("agregar_carrito", () => {
    it("agrega un producto nuevo con cantidad 1", () => {
      const r = agregar_carrito([], chanel5);
      expect(r.carrito.length).toBe(1);
      expect(r.carrito[0].cantidad).toBe(1);
      expect(r.mensaje).toBe("Chanel N°5 agregado al carrito.");
    });

    it("suma una unidad si el producto ya está en el carrito", () => {
      const r1 = agregar_carrito([], chanel5);
      const r2 = agregar_carrito(r1.carrito, chanel5);
      expect(r2.carrito.length).toBe(1);
      expect(r2.carrito[0].cantidad).toBe(2);
    });

    it("no supera el stock y devuelve un mensaje", () => {
      let carrito = agregar_carrito([], sauvage).carrito;
      carrito = agregar_carrito(carrito, sauvage).carrito;
      const r = agregar_carrito(carrito, sauvage);
      expect(r.carrito[0].cantidad).toBe(2);
      expect(r.mensaje).toBe("No puedes añadir más de 2 unidades de Sauvage.");
    });

    it("al sumar una unidad no altera los otros productos del carrito", () => {
      let carrito = agregar_carrito([], sauvage).carrito;
      carrito = agregar_carrito(carrito, chanel5).carrito;
      carrito = agregar_carrito(carrito, sauvage).carrito;
      expect(carrito.find((i) => i.id === 1)?.cantidad).toBe(2);
      expect(carrito.find((i) => i.id === 3)?.cantidad).toBe(1);
    });

    it("no agrega productos sin stock", () => {
      const r = agregar_carrito([], agotado);
      expect(r.carrito.length).toBe(0);
      expect(r.mensaje).toContain("no tiene stock");
    });

    it("no modifica el arreglo original (inmutabilidad)", () => {
      const original = agregar_carrito([], chanel5).carrito;
      agregar_carrito(original, chanel5);
      expect(original[0].cantidad).toBe(1);
    });
  });

  describe("cambiar_cantidad / eliminar", () => {
    it("aumenta y disminuye la cantidad", () => {
      const base = agregar_carrito([], chanel5).carrito;
      const mas = cambiar_cantidad(base, 3, 1);
      expect(mas[0].cantidad).toBe(2);
      expect(cambiar_cantidad(mas, 3, -1)[0].cantidad).toBe(1);
    });

    it("elimina el producto cuando la cantidad llega a 0", () => {
      const base = agregar_carrito([], chanel5).carrito;
      expect(cambiar_cantidad(base, 3, -1).length).toBe(0);
    });

    it("no permite superar el stock con cambiar_cantidad", () => {
      const base = agregar_carrito([], sauvage).carrito;
      const dos = cambiar_cantidad(base, 1, 1);
      expect(cambiar_cantidad(dos, 1, 1)[0].cantidad).toBe(2);
    });

    it("cambiar_cantidad solo modifica el producto indicado", () => {
      let carrito = agregar_carrito([], sauvage).carrito;
      carrito = agregar_carrito(carrito, chanel5).carrito;
      const resultado = cambiar_cantidad(carrito, 3, 1);
      expect(resultado.find((i) => i.id === 1)?.cantidad).toBe(1);
      expect(resultado.find((i) => i.id === 3)?.cantidad).toBe(2);
    });

    it("eliminar_del_carrito quita solo el producto indicado", () => {
      let carrito = agregar_carrito([], sauvage).carrito;
      carrito = agregar_carrito(carrito, chanel5).carrito;
      const resultado = eliminar_del_carrito(carrito, 1);
      expect(resultado.length).toBe(1);
      expect(resultado[0].id).toBe(3);
    });
  });

  describe("totales", () => {
    it("calcular_total suma usando el precio de oferta", () => {
      let carrito = agregar_carrito([], sauvage).carrito;
      carrito = agregar_carrito(carrito, sauvage).carrito;
      carrito = agregar_carrito(carrito, chanel5).carrito;
      expect(calcular_total(carrito)).toBe(79990 * 2 + 99990);
      expect(contar_items(carrito)).toBe(3);
    });

    it("calcular_total de un carrito vacío es 0", () => {
      expect(calcular_total([])).toBe(0);
      expect(contar_items([])).toBe(0);
    });
  });

  describe("localStorage (con mocks)", () => {
    it("guardar_carrito escribe el JSON bajo la clave 'carrito'", () => {
      const espia = spyOn(Storage.prototype, "setItem");
      const carrito = agregar_carrito([], chanel5).carrito;
      guardar_carrito(carrito);
      expect(espia).toHaveBeenCalledWith("carrito", JSON.stringify(carrito));
    });

    it("guardar_carrito no falla si el almacenamiento lanza un error", () => {
      spyOn(Storage.prototype, "setItem").and.throwError("lleno");
      expect(() => guardar_carrito([])).not.toThrow();
    });

    it("cargar_carrito devuelve lo guardado", () => {
      const carrito = agregar_carrito([], chanel5).carrito;
      guardar_carrito(carrito);
      expect(cargar_carrito()).toEqual(carrito);
    });

    it("cargar_carrito devuelve [] si el JSON está corrupto", () => {
      spyOn(Storage.prototype, "getItem").and.returnValue("{esto no es json");
      expect(cargar_carrito()).toEqual([]);
    });

    it("cargar_carrito devuelve [] si lo guardado no es un arreglo", () => {
      spyOn(Storage.prototype, "getItem").and.returnValue('{"a":1}');
      expect(cargar_carrito()).toEqual([]);
    });

    it("cargar_carrito devuelve [] si no hay nada guardado", () => {
      expect(cargar_carrito()).toEqual([]);
    });
  });
});
