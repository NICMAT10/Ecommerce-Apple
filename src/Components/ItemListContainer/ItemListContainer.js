import { Text, Spinner, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import ItemList from "../../Components/ItemList/ItemList"

import { useProducts } from "../../Firebase/Services/Firestore/Products"

const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { getProducts } = useProducts()

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, []) //eslint-disable-line

    if(loading) {
        return (
            <Flex height='100%' flexDirection='column' justifyContent='center'>
                <Spinner />
            </Flex>
        )
    }

    return (
        <Flex height='100%' flexDirection='column' justifyContent='flex-start' alignItems='center'>
            <Text fontSize='2xl'>Productos</Text>
            <ItemList products={products}/>
        </Flex>
    )
}

export default ItemListContainer