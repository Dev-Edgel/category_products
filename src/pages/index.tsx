import Carrucel from "@/modulos/productos/components/Carrucel";
import { Box, Grid } from "@mui/material";
import CardCategory from "@/modulos/productos/components/CardCategory";
import { useEffect, useState } from "react";
import { CategoyType } from "@/modulos/productos/types/productoTypes";

export default function Home() {

  const [categories, setCategories] = useState<CategoyType[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((datos) => {
        setCategories(datos);
        console.log(datos)
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        console.log("Ejecución finalizada...");
      });
  }, []);

  return (
    <Box sx={{ width: '90%', mx: 'auto' }}>
      <Carrucel />

      <Grid
        container spacing={2}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        sx={{ mt: -30, position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}
      >
          {categories.map((category) => (
            <Grid key={category.slug} size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
                <CardCategory category={category} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
