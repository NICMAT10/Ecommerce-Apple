import { Routes, Route, Navigate } from 'react-router-dom'

import ItemListContainer from '../Components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from '../Components/ItemDetailContainer/ItemDetailContainer'
import Login from '../Components/Login/Login'
import Profile from '../Components/Profile/Profile'
import Cart from '../Components/Cart/Cart'
import OrdersList from '../Components/OrdersList/OrdersList'

import { useAuth } from '../Context/AuthContext'
import ProtectedRoute from '../Routes/ProtectedRoute/ProtectedRoute'
import PublicRoute from '../Routes/PublicRoute/PublicRoute'
import BackOfficeRoute from '../Routes/BackOfficeRoute/BackOfficeRoute'
import ItemsManagerContainer from '../Components/ItemsManagerContainer/ItemsManagerContainer'
import ItemForm from '../Components/ItemForm/ItemForm'

//Agregado al ultimo
import About from '../Components/About/About'
import Contact from '../Components/Contact/Contact'


const AppRouter = () => {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/detail/:productId' element={<ItemDetailContainer />} />
            
            <Route element={<PublicRoute user={user} redirectPath='/profile'/>}>
                <Route path='/login' element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute user={user}/>}>
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='/profile/:userId/orders' element={<OrdersList />} />
                <Route path='/cart' element={<Cart />} /> 
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Route>

            <Route path='/backoffice/' element={<BackOfficeRoute user={user}/>}>
              <Route path='products/' element={<ItemsManagerContainer />} />
              <Route path='products/create' element={<ItemForm />} />
              <Route path='products/:productId/edit' element={<ItemForm />} />
              <Route path='users/' element={<h1>Products manager</h1>} />
            </Route> 

            <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
    )
}

export default AppRouter