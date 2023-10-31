import { useState } from "react";
import { Button, Flex, Text, Box, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import ItemCart from "../../Components/ItemCart/ItemCart";

import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";

import { useOrders } from "../../Firebase/Services/Firestore/Orders";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const navigate = useNavigate();
  const { cart, totalProductsAdded, totalToPay, clearCart } = useCart();

  const { user } = useAuth();
  const { createOrder } = useOrders();

  const handleCreateOrder = () => {
    setLoading(true);
    // Crear una orden y gestionar la respuesta
    createOrder()
      .then((response) => {
        console.log(response);
        if (response.result === "orderCreated") {
          clearCart(); // Limpiar el carrito si se crea la orden con éxito
          setOrderId(response.id);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Pantalla de carga mientras se procesa la orden
  if (loading) {
    return (
      <Flex height="100%" flexDirection="column" justifyContent="center">
        <Spinner />
      </Flex>
    );
  }
  // Mostrar cuando se ha creado con éxito una orden
  if (orderId !== "") {
    return (
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        p={50}
      >
        <Box>
          <Text fontSize="3xl">
            Su ID de pedido es: {orderId}.Contacta con nosotros para el envío
          </Text>
          <Button
            variant="solid"
            size="md"
            backgroundColor="#eeeeee"
            onClick={() => navigate(`/profile/${user.uid}/orders`)}
          >
            Pedidos
          </Button>
        </Box>
        <Flex flexDirection="column">
          <Text fontSize="3xl">Consulta nuestros productos...</Text>
          <Button
            variant="solid"
            size="md"
            backgroundColor="#eeeeee"
            onClick={() => navigate("/")}
          >
            Productos
          </Button>
        </Flex>
      </Flex>
    );
  }
   // Mostrar cuando el carrito está vacío
  if (!totalProductsAdded) {
    return (
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        p={50}
      >
        <Box>
          <Text fontSize="3xl">Tu carrito esta vacio</Text>
        </Box>
        <Flex flexDirection="column">
          <Text fontSize="3xl">Consulta nuestros productos...</Text>
          <Button
            variant="solid"
            size="md"
            backgroundColor="#eeeeee"
            onClick={() => navigate("/")}
          >
            Productos
          </Button>
        </Flex>
      </Flex>
    );
  }
  // Mostrar el contenido del carrito
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      p={50}
    >
      <Text fontSize="3xl" mb={20}>
        tu carrito
      </Text>
      <Flex flexDirection="column" height="100%">
        {cart.map((prod) => (
          <ItemCart key={prod.id} {...prod} />
        ))}
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <Text fontWeight={800} fontSize={"3xl"}>
          Total: ${totalToPay}
        </Text>
        <Button
          variant="solid"
          size="lg"
          backgroundColor="#aaeeee"
          onClick={handleCreateOrder}
        >
          Crear Orden
        </Button>
      </Flex>
    </Flex>
  );
};

export default Cart;
