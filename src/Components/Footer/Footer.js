// Footer.js
import { Box, Text, Center, Flex } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="gray.200" p={4} mt={4}>
      <Center>
        <Text fontSize="sm" color="DarkKhaki">
          © 2023 Estudiantes UTN. Todos los derechos reservados.
          Desarrollado por Agustin y Matias
        </Text>
        <Flex direction="flex" alignItems="center" >
          <a href="https://github.com/NICMAT10" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} style={{ margin: "0.5rem" }} />
          </a>
          <a href="https://www.linkedin.com/in/matias-maraz-1943a1284/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} style={{ margin: "0.5rem" }} />
          </a>
          <a href="https://www.facebook.com/tu-usuario" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} style={{ margin: "0.5rem" }} />
          </a>
        </Flex>
      </Center>
    </Box>
  );
};

export default Footer;
