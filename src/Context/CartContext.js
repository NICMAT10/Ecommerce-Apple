import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [totalProductsAdded, setTotalProductsAdded] = useState(0)
    const [totalToPay, setTotalToPay] = useState(0)

    useEffect(() => {
        // Actualizar el número total de productos agregados cuando el carrito cambia
        updateTotalProductsAdded()
        // Actualizar el costo total a pagar cuando el carrito cambia
        updateTotalToPay()
        // Se ejecuta cada vez que el carrito cambia
    }, [cart]) //eslint-disable-line

    const addItem = (productToAdd) => {
        if(!isInCart(productToAdd.id)) {
            // Agregar un producto nuevo al carrito
            setCart([...cart, productToAdd])
        } else {
            // Actualizar la cantidad de un producto existente en el carrito
            const newProducts = cart.map(prod => {
                if(prod.id === productToAdd.id) {
                    const newProduct = {
                        ...prod,
                        quantity: productToAdd.quantity
                    }
                    return newProduct
                } else {
                    return prod
                }
            })
            setCart(newProducts)
        }
    }

    const updateTotalProductsAdded = () => {
        let count = 0
        cart.forEach(prod => {
            count += prod.quantity
        })
    // Actualizar el estado con el número total de productos agregados
        setTotalProductsAdded(count)
    }

    const updateTotalToPay = () => {
        let total = 0
        cart.forEach(prod => {
            total += prod.quantity * prod.price
        })
        // Actualizar el estado con el costo total a pagar
        setTotalToPay(total)
    }
    
    const isInCart = (id) => {
        // Verificar si un producto está en el carrito
        return cart.some(p => p.id === id )
    }

    const clearCart = () => {
        // Limpiar el carrito (eliminar todos los productos)
        setCart([])
    }

    const removeItem = (id) => {
        // Eliminar un producto del carrito
        const products = cart.filter(prod => prod.id !== id )
        setCart(products)
    }

    const getProductQuantity = (id) => {// Obtener la cantidad de un producto en el carrito
        return cart.find(prod => prod.id === id)?.quantity
    }


    return(
        <CartContext.Provider value={{
            cart,
            totalProductsAdded,
            totalToPay,
            addItem,
            isInCart,
            clearCart,
            removeItem,
            getProductQuantity,

        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    // Hook personalizado para acceder al contexto del carrito
    return useContext(CartContext)
}