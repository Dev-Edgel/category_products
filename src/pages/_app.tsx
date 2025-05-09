import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { CssBaseline } from "@mui/material";
import CartProvider from "@/modulos/compras/context/CartProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
