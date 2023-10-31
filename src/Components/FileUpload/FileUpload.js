import {
  AspectRatio,
  Box,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  Flex
} from "@chakra-ui/react";



export default function FileUpload({ handleChange }) {
  
  return (
    <Container>
      {/* Contenedor con relación de aspecto 10.1 (puedes ajustar según las necesidades) */}
      <AspectRatio width="128" ratio={10.1}>
        <Box
          borderColor="gray.300"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: "md"
          }}
          
          initial="rest"
          animate="rest"
          
        >
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Stack
                height="100%"
                width="100%"
                display="flex"
                alignItems="center"
                justify="center"
                spacing="4"
              >
                  <Flex p="8" textAlign="center" spacing="1">
                      <Heading fontSize="lg" color="gray.700" fontWeight="bold" mr={10}>
                      Suelta imágenes aquí
                      </Heading>
                      <Text fontWeight="light">o haga clic para subir</Text>
                  </Flex>
              </Stack>
            </Box>
            {/* Input oculto para cargar archivos */}
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onChange={handleChange}
              
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}
