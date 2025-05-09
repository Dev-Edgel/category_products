import { Button, Card, CardActionArea, CardActions, CardContent, ImageList, ImageListItem, Typography } from "@mui/material"
import { CategoyType } from "../types/productoTypes"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface CardCategoryProps {
  category: CategoyType;
}

type Producto = {
  id: number;
  thumbnail: string;
  title: string;
};

type ProductoAPI = {
  id: number;
  thumbnail: string;
  title: string;
};

const CardCategory = ({ category }: CardCategoryProps) => {
  const router = useRouter();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category.slug) return;
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${category.slug}`)
      .then((res) => res.json())
      .then((datos) => {
        const productosFiltrados: Producto[] = datos.products.map((p: ProductoAPI) => ({
          id: p.id,
          thumbnail: p.thumbnail,
          title: p.title,
        }));
        setProductos(productosFiltrados);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [category.slug]);

  return (
    <Card sx={{ maxWidth: 420 }}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom 
            variant="h5"
            component="div"
            onClick={() => {
              router.push(`/categories/${category.slug}`);
            }}
          >
            {category.name}
          </Typography>
        </CardContent>
        <ImageList
          sx={{ width: 350, height: 490, paddingLeft: "10px" }}
          cols={2} rowHeight={164}
          onClick={() => {
            router.push(`/categories/${category.slug}`);
          }}
        >
          {loading && <Typography>Cargando imagen...</Typography>}
          {productos.slice(0, 4).map((producto) => (
            <ImageListItem key={producto.id}>
              <img src={producto.thumbnail} alt={producto.title} loading="lazy" />
              <Typography gutterBottom component="div">
                {producto.title}
              </Typography>
            </ImageListItem>
          ))}
        </ImageList>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            router.push(`/categories/${category.slug}`);
          }}
        >
          See {category.name}
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardCategory