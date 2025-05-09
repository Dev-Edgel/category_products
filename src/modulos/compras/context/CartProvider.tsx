import { ProductoCarritoType } from "@/modulos/productos/types/productoTypes";
import React, { createContext, useContext, useState } from "react";

interface CartContextType {
  cartProductos: ProductoCarritoType[];
  precioTotal: string;
  totalItems: number;
  agregarProducto: (producto: ProductoCarritoType) => void;
  eliminarProducto: (productoId: number) => void;
  actualizarCantidad: (productoId: number, cantidad: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface TodosProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: TodosProviderProps) => {
  const [cartProductos, setCartProductos] = useState<ProductoCarritoType[]>([]);

  const precioTotal = cartProductos.reduce((total, cartProducto) => {
    return total + cartProducto.quantity * cartProducto.price;
  }, 0);

  const totalItems = cartProductos.reduce((totalItems, cartProducto) => {
    return totalItems + cartProducto.quantity;
  }, 0);

  const agregarProducto = (producto: ProductoCarritoType) => {
    const existeProducto = cartProductos.find(
      (cartProducto) => cartProducto.id === producto.id
    );

    if (existeProducto) {
      const listaActualizada = cartProductos.map((cartProductos) => {
        if (cartProductos.id === producto.id) {
          return {
            ...cartProductos,
            quantity: cartProductos.quantity + producto.quantity,
          };
        }
        return cartProductos;
      });
      setCartProductos([...listaActualizada]);
    } else {
      setCartProductos([...cartProductos, producto]);
    }
  };

  const eliminarProducto = (productoId: number) => {
    const listaFiltrada = cartProductos.filter(
      (producto) => producto.id !== productoId
    );
    setCartProductos(listaFiltrada);
  };

  const actualizarCantidad = (productoId: number, cantidad: number) => {
    const listaActualizada = cartProductos.map((cartProductos) => {
      if (cartProductos.id === productoId) {
        return {
          ...cartProductos,
          quantity: cantidad,
        };
      }
      return cartProductos;
    });
    setCartProductos([...listaActualizada]);
  };

  const contexto: CartContextType = {
    cartProductos,
    precioTotal: precioTotal.toFixed(2),
    totalItems,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
  };

  return <CartContext value={contexto}>{children}</CartContext>;
};

export default CartProvider;

export const useCart = () => {
  const contexto = useContext(CartContext);
  if (!contexto) {
    throw new Error("useCart debe estar dentro de un CartProvider");
  }
  return contexto;
};
