import MainLayout from "@/common/components/MainLayout";
import { useCart } from "@/modulos/compras/context/CartProvider";
import { ProductoType } from "@/modulos/productos/types/productoTypes";
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Divider, Grid, MenuItem, Rating, Select, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProduct = () => {
  const { agregarProducto } = useCart();
  const router = useRouter();

  const [producto, setProducto] = useState<ProductoType | null>(null);
  const [loading, setLoading] = useState(false);

  const [cantidad, setCantidad] = useState(1);

  const idProducto = router.query.idProducto;

  useEffect(() => {
    if (!idProducto) return;
    setLoading(true);
    fetch(`https://dummyjson.com/products/${idProducto}`)
      .then((res) => res.json())
      .then((datos) => setProducto(datos))
      .finally(() => setLoading(false));
  }, [idProducto]);

  return (
    <MainLayout titulo="Detalle del Producto">
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
      {producto && (
        <Grid container>
          <Grid size={1}>
            {producto.images.map((imgUrl, index) => (
              <Grid size={12} key={index}>
                <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 1 }}>
                  <CardMedia
                    component="img"
                    image={imgUrl}
                    alt={`Producto ${index}`}
                    height="150"
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid size={3}>
            <CardMedia
              component="img"
              image={producto.thumbnail}
              alt="green iguana"
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid size={6}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h3" component="div" color="primary">
                {producto.title}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {producto.description}
              </Typography>
              <Box display={"flex"} gap={1}>
                <Rating
                  name="half-rating-read"
                  defaultValue={producto.rating}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <Typography variant="caption" color="info">
                  {producto.rating}
                </Typography>
              </Box>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {producto.shippingInformation}
              </Typography>              
              <Divider />
              <Typography gutterBottom variant="h4" fontWeight={"bold"}>
                <Typography component="sup" variant="body2" sx={{ verticalAlign: 'super', fontSize: '1.5rem' }}>
                  $
                </Typography>
                {producto.price}
              </Typography>
              <Typography gutterBottom variant="body2" color="info">
                {producto.brand}
              </Typography>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {producto.warrantyInformation}
              </Typography>
              <Grid container>
                <Grid size={6}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Height
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2">
                    {producto.dimensions.height} in
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Width
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2">
                    {producto.dimensions.width} in
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Box>
                <Typography variant="subtitle1" fontWeight={"bold"}>
                  About this item
                </Typography>
                {producto.reviews.map((review, index) => (
                  <Typography key={index} variant="body2" component={"li"}>
                    {review.comment}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Grid>
          <Grid size={2}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h4" fontWeight={"bold"}>
                    ${producto.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {producto.warrantyInformation}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="success"
                    fontWeight={"bold"}
                  >
                    {producto.availabilityStatus}
                  </Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    fullWidth
                    value={cantidad}
                    startAdornment={
                      <Typography variant="body2" mr={1}>
                        Quantity:
                      </Typography>
                    }
                    onChange={(e) => {
                      const cantidad = e.target.value as number;
                      setCantidad(cantidad);
                    }}
                  >
                    {Array.from({ length: 100 }, (_, index) => (
                      <MenuItem key={index} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      agregarProducto({
                        ...producto,
                        quantity: cantidad,
                      });
                    }}
                  >
                    Add to cart
                  </Button>
                  <Button fullWidth variant="contained">
                    Buy now
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </MainLayout>
  )
}

export default DetailProduct