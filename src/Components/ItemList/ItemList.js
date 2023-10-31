import { SimpleGrid } from "@chakra-ui/react"

import Item from "../../Components/Item/Item"
// Componente para mostrar una lista de productos
const ItemList = ({ products }) => {
    return (
        <SimpleGrid columns={3} spacing='50px'>
            { products.map(prod => <Item key={prod.id} {...prod} />)}
        </SimpleGrid>
    )
}

export default ItemList