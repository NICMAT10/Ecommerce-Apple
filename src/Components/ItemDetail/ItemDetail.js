import { useState } from "react";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import AddToCart from "../../Components/AddToCard/AddToCard";

import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";

const Rating = ({ rating = 4.2, numReviews = 36 }) => {
  return (
    <Box d="flex" alignItems="center">
      <Flex>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          })}
      </Flex>
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
};

const ItemDetail = ({
  id,
  name,
  category,
  price,
  imageUrl,
  rating,
  numReviews,
  isNew,
  description,
  stock,
}) => {
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const { addItem, getProductQuantity } = useCart();

  const prodQuantity = getProductQuantity(id);

  const handleAddToCart = (quantity) => {
    setQuantity(quantity);

    addItem({ id, name, price, quantity });
  };

  return (
    <Flex
      alignItems="flex-start"
      justifyContent="center"
      width="90%"
      height="40vh"
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        maxW="lg"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        height="100%"
      >
        {isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}

        <Image
          src={imageUrl}
          alt={`Picture of ${name}`}
          height="100%"
          roundedTopLeft="lg"
          roundedBottomLeft="lg"
          width={282}
          objectFit={"cover"}
        />
      </Flex>
      <Flex
        p="6"
        width="40vw"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
          {category}
        </Text>
        <Flex width="40vw" flexDirection="column" justifyContent="flex-start">
          <Box d="flex" alignItems="baseline">
            {isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                Nuevo
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              mb={6}
              w="70%"
            >
              {name}
            </Box>
            {!user ? (
              <Button
                variant="solid"
                size="md"
                backgroundColor="#eeeeee"
                onClick={() =>
                  navigate("/login", { state: { from: location } })
                }
              >
                Inicia sesión y compra
              </Button>
            ) : quantity > 0 ? (
              <Text>
                Tu agregaste {quantity} {name}
              </Text>
            ) : stock > 0 ? (
              <AddToCart
                initial={prodQuantity}
                stock={stock}
                onAdd={handleAddToCart}
              />
            ) : (
              <Text fontWeight={400} fontSize={"2xl"}>
                Agotado{" "}
              </Text>
            )}
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={rating} numReviews={numReviews} />
            <Text fontWeight={800} fontSize={"2xl"}>
              $ {price?.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
        <Flex mt={10}>
          <Box
            fontSize="l"
            fontWeight="semibold"
            as="p"
            lineHeight="tight"
            overflow="hidden"
          >
            Descripción: {description}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ItemDetail;
