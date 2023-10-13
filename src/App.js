import React from 'react'
import {
  ChakraProvider,
} from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import AppRouter from './Routes/AppRouter'
import { AuthProvider } from './Context/AuthContext'
import { CartProvider } from './Context/CartContext'
import Layout from './Components/Layout/Layout'
import Footer from './Components/Footer/Footer'

const App = () => (
  <ChakraProvider resetCSS>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
    <Footer/>
  </ChakraProvider>
)

export default App