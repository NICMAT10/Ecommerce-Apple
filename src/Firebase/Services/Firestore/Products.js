import { db } from '../../Firebase'
import {
    getDocs,
    query,
    collection,
    where,
    getDoc,
    doc,
    addDoc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'

export const useProducts = () => {
    // Obtener productos de la base de datos
    const getProducts = (categoryId) => {
        return new Promise((resolve, reject) => {
            const collectionRef = categoryId 
                ? query(collection(db, 'products'), where('category', '==', categoryId))
                : collection(db, 'products')
    
            getDocs(collectionRef)
                .then(response => {
                    const products = response.docs.map(doc => {
                        return { id: doc.id, ...doc.data()}
                    })
                    resolve(products)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
     // Obtener un producto por su ID
    const getProductById = (productId) => {
        return new Promise((resolve, reject) => {
            const docRef = doc(db, 'products', productId)
    
            getDoc(docRef)
                .then(response => {
                    const product = { id: response.id, ...response.data()}
                    resolve(product)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    // Agregar un nuevo producto a la base de datos
    const addProduct = (newProduct) => {
        return new Promise((resolve, reject) => {
            const collectionRef = collection(db, 'products')

            addDoc(collectionRef, newProduct)
                .then(({ id }) => {
                    resolve(id)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    // Eliminar un producto por su ID
    const deleteProduct = (productId) => {
        return new Promise((resolve, reject) => {
            const docRef = doc(db, 'products', productId)

            deleteDoc(docRef)
                .then(() => {
                    resolve(true)
                })
                .catch(error => {
                    reject(false)
                })
        })
    }
    // Editar un producto existente
    const editProduct = (productId, newData) => {
        return new Promise((resolve, reject) => {
            const docRef = doc(db, 'products', productId)

            updateDoc(docRef, {...newData})
                .then(() => {
                    resolve(true)
                })
                .catch(error => {
                    reject(false)
                })
        })
    }

    return {
        getProducts,
        getProductById,
        addProduct,
        deleteProduct,
        editProduct
    }
}