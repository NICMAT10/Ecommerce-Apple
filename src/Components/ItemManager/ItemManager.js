import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Flex,
  Button,
  Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Componente para gestionar un elemento de producto (editar y eliminar)
const ItemManager = ({ id, name, imageUrl, price, handleDeleteProduct }) => {
  const navigate = useNavigate()
  // Redirigir a la página de detalles del producto al hacer clic en el elemento
  const handleEditItem = (e) => {
      e.stopPropagation() // Evitar que el clic se propague a los elementos contenedores
      navigate(`/backoffice/products/${id}/edit`)
  }
   // Eliminar el producto al hacer clic en el botón "Eliminar"
  const handleRemoveItem = (e) => {
      e.stopPropagation()
      handleDeleteProduct(id, imageUrl)
  }

  return (
      <Flex width='100%' onClick={() => navigate(`/detail/${id}`)} cursor='pointer' m={3}>
          <Box
              role={'group'}
              p={6}
              maxW={'100%'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
          >
              <Flex justifyContent='space-around' alignItems='center'>
                  <Image
                      src={imageUrl}
                      alt={`Picture of ${name}`}
                      height='10vh'
                      roundedTopLeft='lg'
                      roundedBottomLeft='lg'
                      width={'10vh'}
                      objectFit={'cover'}
                      mr={20}
                  />
                  <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} noOfLines={1} width='60%'>
                      {name}
                  </Heading>
                  <Flex justifyContent='space-around' width='20%'>
                      <Text fontWeight={800} fontSize={'xl'}>
                          ${price}
                      </Text>
                  </Flex>
                  <Flex justifyContent='space-around'>
                      <Button 
                              variant="solid" 
                              size="md" 
                              backgroundColor="#00d1ff"
                              color="#ffffff"
                              mx={1}
                              onClick={handleEditItem}
                          >
                              Editar
                      </Button>
                      <Button 
                              variant="solid" 
                              size="md" 
                              backgroundColor="#ff6666"
                              color="#ffffff"
                              mx={1}
                              onClick={handleRemoveItem}
                      >
                              Eliminar
                      </Button>
                  </Flex>
              </Flex>
          </Box>
      </Flex>
  );
}

export default ItemManager