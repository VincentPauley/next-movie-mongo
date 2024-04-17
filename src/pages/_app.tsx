import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import NavigationMenu from '@/components/NavigationMenu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Typography } from '@mui/material';
export const queryClient = new QueryClient()

import MovieCountDisplay from '@/components/MovieCountDisplay';

export default function App({ Component, pageProps }: AppProps) {
  const [drawerOpen, toggleDrawerOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: '#2c2c2c' }}>
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={drawerOpen} onClose={() => toggleDrawerOpen(false)}>
              <NavigationMenu/>
            </Drawer>
            <Typography sx={{ marginRight: '.5rem' }} variant="h6">Movie Knight</Typography>
            <MovieCountDisplay/>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Component {...pageProps} />
    </QueryClientProvider>
  ); 
}
