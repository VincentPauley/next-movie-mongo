import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NavigationMenu from '@/components/NavigationMenu';

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const [drawerOpen, toggleDrawerOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <Button onClick={() => toggleDrawerOpen(true)}>Menu</Button>
      <Drawer open={drawerOpen} onClose={() => toggleDrawerOpen(false)}>
        <NavigationMenu/>
      </Drawer>
      <Component {...pageProps} />
    </QueryClientProvider>
  ); 
}
