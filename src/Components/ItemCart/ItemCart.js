import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../Context/CartContext";

const ItemCart = ({ id, name, quantity, price }) => {
  const navigate = useNavigate();
  // Obtener la función para eliminar un elemento del carrito
  const { removeItem } = useCart();
  // Manejar la eliminación de un elemento del carrito
  const handleRemoveItem = (e) => {
    e.stopPropagation(); // Evitar la propagación del clic al elemento contenedor
    removeItem(id);  // Llamar a la función para eliminar el elemento del carrito
  };

  return (
    <Flex
      width="90vw"
      onClick={() => navigate(`/detail/${id}`)}
      cursor="pointer"
      m={3}
    >
      <Box
        role={"group"}
        p={6}
        maxW={"100%"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >{/* Nombre del producto */}
        <Flex justifyContent="space-around">
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {name}
          </Heading>
           {/* Cantidad del producto */}
          <Flex justifyContent="space-around" width="50%">
            <Text fontWeight={800} fontSize={"xl"}>
              Cantidad: {quantity}
            </Text>
            {/* Precio unitario del producto */}
            <Text fontWeight={800} fontSize={"xl"}>
              ${price}
            </Text>
            {/* Subtotal del producto (Cantidad x Precio) */}
            <Text fontWeight={800} fontSize={"xl"}>
              Subtotal: ${price * quantity}
            </Text>
          </Flex>
          {/* Botón para eliminar el producto del carrito */}
          <Button
            variant="solid"
            size="md"
            backgroundColor="#ff6666"
            color="#ffffff"
            onClick={handleRemoveItem}
          >
            Eliminar
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ItemCart;
