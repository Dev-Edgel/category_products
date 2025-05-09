import { ReactNode } from 'react'
import Header from './Header'
// import Footer from './Footer'
import Head from 'next/head';
import { Box, Button, Container, Divider, Drawer, Typography } from '@mui/material';
import CardProductoCarrito from '@/modulos/productos/components/CardProductoCarrito';
import { useCart } from '@/modulos/compras/context/CartProvider';

const DRAWER_WIDTH = "180px";

interface Props {
  children: ReactNode;
  titulo: string;
}

const MainLayout = ({ children, titulo }: Props) => {
  const { cartProductos, eliminarProducto, actualizarCantidad, precioTotal } = useCart();

  const exiteProductos = cartProductos.length > 0;

  const open = exiteProductos;

  return (
    <>
      <Box
        sx={{
          marginRight: open ? DRAWER_WIDTH : 0,
        }}
      >
        <Head>
          <title>{titulo}</title>
        </Head>
        <Header />
        <Container maxWidth="xl" sx={{ marginTop: 2 }}>
          {children}
        </Container>
        {/* <Footer /> */}
      </Box>
      <Drawer
        open={open}
        anchor="right"
        variant="persistent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        <Box sx={{ textAlign: "center", p: 1 }}>
          <Typography variant="subtitle2">Subtotal</Typography>
          <Typography variant="subtitle1" fontWeight={"bold"} color="error">
            ${precioTotal}
          </Typography>
          <Button fullWidth variant="outlined">
            Go to Cart
          </Button>
        </Box>
        <Divider />
        <Box>
          {cartProductos.map((producto) => (
            <CardProductoCarrito
              key={producto.id}
              producto={producto}
              onDelete={() => {
                eliminarProducto(producto.id);
              }}
              onUpdateQuantity={(cantidad) => {
                actualizarCantidad(producto.id, cantidad);
              }}
            />
          ))}
        </Box>
      </Drawer>
    </>
  )
}

export default MainLayout