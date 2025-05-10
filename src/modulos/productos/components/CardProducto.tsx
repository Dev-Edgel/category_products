import { Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import { ProductoType } from "../types/productoTypes";
import { Info } from "@mui/icons-material";
import SpaIcon from '@mui/icons-material/Spa';

interface CardProductoProps {
  producto: ProductoType;
  onClick: () => void;
  agregarProducto: () => void;
}

const CardProducto = ({
  producto, 
  onClick,
  agregarProducto,
}: CardProductoProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 280,
        height: 780,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={producto.thumbnail}
          alt="green iguana"
          onClick={onClick}
          sx={{
            width: "240px",
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            // onClick={onClick}
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                color: "primary.main",
              },
            }}
            // endIcon={<HomeRepairServiceOutlined />}
          >
            {producto.title}
            <Tooltip arrow title={producto.availabilityStatus} placement="top">
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography 
            variant="h6"
            onClick={onClick}
          >
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
          <Typography gutterBottom variant="h4" fontWeight={"bold"}>
            <Typography component="sup" variant="body2" sx={{ verticalAlign: 'super', fontSize: '1.2rem' }}>
              $
            </Typography>
            {producto.price}
          </Typography>
          <Typography gutterBottom variant="body2" color="info">
            {producto.brand}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            <IconButton>
              <SpaIcon color="success" />
            </IconButton>
            {producto.warrantyInformation}
          </Typography>
          <Button 
            variant="contained"
            color="warning"
            onClick={agregarProducto}
          >
            Add to cart
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardProducto