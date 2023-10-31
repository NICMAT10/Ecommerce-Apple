import { Spinner, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import ItemManager from '../../Components/ItemManager/ItemManager'
import NavBar from "../ItemsManagerControls/ItemsManagerControls"

import { useProducts } from "../../Firebase/Services/Firestore/Products"
import { useImageStorage } from "../../Firebase/Services/Storage/Images"
// Componente para gestionar múltiples elementos de producto
const ItemsManagerContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { getProducts, deleteProduct } = useProducts()
    const { deleteImage } = useImageStorage()

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, []) //eslint-disable-line

  // Manejar la eliminación de un producto
    const handleDeleteProduct = (id, imageUrl) => {
        setLoading(true)

        deleteProduct(id).then(isDeleted => {
            if(isDeleted) {
                deleteImage(imageUrl)
                const newProducts = products.filter(prod => prod.id !== id)
                setProducts(newProducts)
            }
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }
  // Mostrar un spinner de carga mientras se obtienen los productos
    if(loading) {
        return (
            <Flex height='100%' flexDirection='column' justifyContent='center'>
                <Spinner />
            </Flex>
        )
    }

    return (
        <Flex height='100%' flexDirection='column' justifyContent='flex-start' alignItems='center'>
            <NavBar />
            <Flex flexDirection='column' width='70%'>
            { products.map(prod => <ItemManager key={prod.id} {...prod} handleDeleteProduct={handleDeleteProduct}/>)}
            </Flex>
        </Flex>
    )
}

export default ItemsManagerContainer