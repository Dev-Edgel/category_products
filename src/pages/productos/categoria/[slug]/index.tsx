import MainLayout from "@/common/components/MainLayout";
import { useCart } from "@/modulos/compras/context/CartProvider";
import CardProducto from "@/modulos/productos/components/CardProducto";
import { ProductoType } from "@/modulos/productos/types/productoTypes";
import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

const getSkip = (page: number) => (page - 1) * DEFAULT_LIMIT;

const getTotalPages = (total: number) => Math.ceil(total / DEFAULT_LIMIT);

const CategoryDetalle = () => {

  const router = useRouter();
  const [productos, setProductos] = useState<ProductoType[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagina, setPagina] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(0);

  const slug = router.query.slug;

  const { agregarProducto } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    const skip = getSkip(pagina);

    fetch(`https://dummyjson.com/products/category/${slug}?limit=${DEFAULT_LIMIT}&skip=${skip}`)
      .then((res) => res.json())
      .then((datos) => {
        setProductos(datos.products);
        const totalPages = getTotalPages(datos.total);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false)
      });
  }, [slug, pagina]);

  return (
    <MainLayout titulo="Productos">
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" fontWeight={"bold"}>
          Results
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ckeck each product page for other buying options. Price and other details may vary based on product size and color.
        </Typography>
      </Box>
      <Stack spacing={2}>
        {loading &&
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={50} />
            <Typography variant="h5" marginRight={2}>Loading...</Typography>
          </Box>
        }
        <Grid
          container spacing={2}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          justifyContent="center"
          sx={{ marginTop: "50px" }}
        >
          {productos.map((producto) => (
            <Grid key={producto.id} size={{ xs: 1 }}>
                <CardProducto
                  producto={producto}
                  agregarProducto={() => {
                    agregarProducto({
                      ...producto,
                      quantity: 1,
                    });
                  }}
                  onClick={() => {
                    router.push(`/productos/${producto.id}`);
                  }}
                />
            </Grid>
          ))}
        </Grid>
        <Box display={"flex"} justifyContent={"center"}>
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            onChange={(e, pagina) => {
              setPagina(pagina);
            }}
          />
        </Box>
        <Box height={"100px"} />
      </Stack>
    </MainLayout>
  )
}

export default CategoryDetalle