import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner, Flex } from "@chakra-ui/react"

import { useProducts } from "../../Firebase/Services/Firestore/Products"

import ItemDetail from '../../Components/ItemDetail/ItemDetail'

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const { productId } = useParams()  // Obtener el ID del producto desde la URL


    const { getProductById } = useProducts() // Utilizar el servicio para obtener detalles de productos


    useEffect(() => {
        setLoading(true) // Mostrar un spinner mientras se carga

        getProductById(productId).then(product => {
            setProduct(product) // Al obtener el producto, establecerlo en el estado
        }).catch(error => {
            console.log(error) // Manejar errores si ocurren
        }).finally(() => {
            setLoading(false) // Ocultar el spinner después de cargar
        })
    }, [productId]) //eslint-disable-line

    if(loading) {
        return (
            <Flex height='100%' flexDirection='column' justifyContent='center'>
                <Spinner />
            </Flex>
        )
    }
    // Renderizar el componente ItemDetail una vez que el producto se haya cargado
    return(
        <ItemDetail {...product}/>
    )
}

export default ItemDetailContainer