import { Box, Typography, Select, MenuItem, IconButton, CardMedia } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductoCarritoType } from "../types/productoTypes";

interface Props {
  producto: ProductoCarritoType;
  onDelete: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CardProductoCarrito = ({
  producto,
  onDelete,
  onUpdateQuantity,
}: Props) => {
  return (
    <Box key={producto.id} textAlign={"center"}>
      <CardMedia
        component="img"
        image={producto.thumbnail}
        alt={producto.title}
        width={120}
        height={120}
      />
      <Typography textAlign={"center"} variant="body2" fontWeight={"bold"}>
        ${producto.price}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        m={2}
      >
        <Select
          id="quantity"
          size="small"
          value={producto.quantity}
          onChange={(e) => {
            const cantidad = e.target.value as number;
            onUpdateQuantity(cantidad);
          }}
          sx={{ borderRadius: 2, height: 32 }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          {Array.from({ length: 100 }, (_, index) => (
            <MenuItem key={index} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardProductoCarrito;
