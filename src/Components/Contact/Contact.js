import React from 'react';
import { Box, Text, Heading, Image, Input, Textarea, Button, FormControl, FormLabel} from '@chakra-ui/react';
import imgContact from '../../Assets/contact.jpg'

const Contact = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" color={'DarkSlateGray'}>Contacto</Heading>
      <Text fontSize="lg" color={'DarkKhaki'}>¿Tienes alguna pregunta o comentario? No dudes en ponerte en contacto con nosotros.</Text>
      <Text fontSize="lg" color={'DarkKhaki'}>Correo electrónico: <a href="matiasnico932@gmail.com">infoapp@gmail.com</a></Text>
      <Text fontSize="lg" color={'DarkKhaki'}>Teléfono: (341) 3069684</Text>
      
      {/* Formulario de contacto */}
      <form>
        <FormControl id="nombre" isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input type="text" placeholder="Tu nombre" />
        </FormControl>
        <FormControl id="correo" isRequired>
          <FormLabel>Correo Electrónico</FormLabel>
          <Input type="email" placeholder="tucorreo@ejemplo.com" />
        </FormControl>
        <FormControl id="mensaje" isRequired>
          <FormLabel>Mensaje</FormLabel>
          <Textarea placeholder="Escribe tu mensaje aquí" />
        </FormControl>
        <Button type="submit" mt={4} colorScheme="teal">Enviar</Button>
      </form>
      
      {/* Imagen opcional */}
      <Image src={imgContact} alt="Imagen de contacto" borderRadius={20}/>
    </Box>
  );
};

export default Contact;
