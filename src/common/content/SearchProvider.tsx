import React, { createContext, useContext, useState } from "react";

interface SearchContext {
  busqueda: string;
  actualizarBusqueda: (busqueda: string) => void;
}

export const SearchContext = createContext<SearchContext | undefined>(
  undefined
);

interface TodosProviderProps {
  children: React.ReactNode;
}

const SearchProvider = ({ children }: TodosProviderProps) => {
  const [busqueda, setBusqueda] = useState("");

  const actualizarBusqueda = (busqueda: string) => {
    setBusqueda(busqueda);
  };

  const contexto: SearchContext = {
    busqueda,
    actualizarBusqueda,
  };

  return <SearchContext value={contexto}>{children}</SearchContext>;
};

export default SearchProvider;

export const useSearch = () => {
  const contexto = useContext(SearchContext);
  if (!contexto) {
    throw new Error("useSearch debe estar dentro de un SearchProvider");
  }
  return contexto;
};