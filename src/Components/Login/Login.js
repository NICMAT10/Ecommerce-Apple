import { useState } from 'react'
import { Button, Flex, Spinner, Input, Text } from "@chakra-ui/react"
import { FaGoogle } from 'react-icons/fa'

import { useAuth } from "../../Context/AuthContext"
import { useLocation, useNavigate } from 'react-router-dom'


const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const { signinWithGoogle, signin } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || "/";

    const handleLoginWithGoogle = () => {
        setLoading(true)
        signinWithGoogle(() => {
            navigate(from, { replace: true })
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleLoginWithEmail = () => {
        setLoading(true)
        signin(userData.email, userData.password, () => {
            navigate(from, { replace: true })
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    if(loading) {
        return (
            <Flex height='100%' flexDirection='column' justifyContent='center'>
                <Spinner />
            </Flex>
        )
    }

    return (
        <Flex 
            height='100%' 
            width='100%' 
            flexDirection='column' 
            justifyContent='flex-start' 
            alignItems='center' 
            backgroundColor='#ffffff'
            py={50}
            px={200}
        >
            <Text fontSize='2xl'>Iniciar</Text>
            <Flex flexDirection='column' width='70%'>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Correo
                    </Text>
                    <Input 
                        value={userData.email}
                        onChange={({ target }) => setUserData({...userData, email: target.value})} 
                    />
                </Flex>
                <Flex width="100%" m={5}>
                    <Text fontSize="xl" width="20vw">
                        Contraseña
                    </Text>
                    <Input 
                        type='password'
                        value={userData.password} 
                        onChange={({ target }) => setUserData({...userData, password: target.value})}
                    />
                </Flex>
            </Flex>
            <Flex flexDirection='column'>
                <Button 
                    variant="solid" 
                    size="md" 
                    backgroundColor="#eeeeee"
                    my={5}
                    onClick={handleLoginWithEmail}
                >
                    Ingresar
                </Button>
            
                <Button
                variant="solid" 
                size="md" 
                backgroundColor="#000000"
                color='#ffffff'
                my={5}
                onClick={handleLoginWithGoogle}
                >
                <FaGoogle style={{ marginRight: '10px'}}/>
                    Ingresar con Google
                </Button>
            </Flex>
        </Flex>
    )
}

export default Login