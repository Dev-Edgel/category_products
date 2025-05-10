import { AppBar, Badge, Box, Toolbar, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
import { useCart } from '@/modulos/compras/context/CartProvider';
import SearchBar from './SearchBar';

const Header = () => {
  const { totalItems } = useCart();
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>          
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
            onClick={() => router.push('/')}
          >
            Products
          </Typography>
          <SearchBar
            onSearch={(valor) => {
              console.log("buscando...", valor);
            }}
          />
          <Badge badgeContent={totalItems} color="secondary" sx={{ ml: 6 }}>
            <ShoppingCartIcon />
          </Badge>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header