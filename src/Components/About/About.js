import React from 'react';
import { Box, Text, Heading, Image} from '@chakra-ui/react';
import imgAbout from '../../Assets/acercade.jpg'

const About = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" color={'DarkSlateGray'}>Acerca de Nosotros</Heading>
      <Text fontSize="lg" color={'DarkKhaki'}>Bienvenido a nuestra tienda en línea. Somos una empresa dedicada a ofrecer los mejores productos Apple. Aquí encontrarás una selección de productos de alta calidad, y estamos agregando nuevos productos cada día.</Text>
      <Text fontSize="lg" color={'DarkKhaki'}>Nuestra misión es proporcionar productos de alta calidad y un excelente servicio al cliente. Gracias por elegirnos.</Text>
      
      <Image src={imgAbout} alt="Imagen de contacto" borderRadius={20}/>
    </Box>

    
  );
};

export default About;
