import {     
  Icon,
  Flex,
  Button,
  Text
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'

import { useCart } from '../../Context/CartContext';

const CartWidget = () => {
  // Obtener la función de navegación desde React Router DOM
  const navigate = useNavigate()
   // Obtener el número total de productos agregados al carrito
  const { totalProductsAdded } = useCart()

  return (
      <Button variant="solid" size="md" onClick={() => navigate('/cart')}>
          <Flex justifyContent='center' alignItems='center'>
              <Icon as={FiShoppingCart} h={5} w={5} alignSelf={'center'} mr={3}/>
              {/* Mostrar el número total de productos agregados */}
              <Text fontSize='lg'>{ totalProductsAdded }</Text>
          </Flex>
      </Button>
  )
}

export default CartWidget