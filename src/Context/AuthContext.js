/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext, useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { useCart } from './CartContext';
import { auth } from '../Firebase/Firebase';
import { useUsers } from '../Firebase/Services/Firestore/Users';
import { useNavigate } from 'react-router-dom';

const formatUser = (rawUser) => {
    return {
        uid: rawUser.uid,
        email: rawUser.email,
        name: rawUser.displayName,
        provider: rawUser.providerData[0].providerId,
        photoUrl: rawUser.photoURL,
        token: rawUser.accessToken
    };
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { createUser, updateUser } = useUsers();

    const handleUser = async (rawUser, provider) => {
        if (rawUser) {
            const user = formatUser(rawUser, provider);
            const { token, ...userWithoutToken } = user;
            let createdUser;
            if (provider !== 'password') {
                createdUser = await createUser(user.uid, userWithoutToken);
            } else {
                createdUser = await createUser(user.uid, userWithoutToken.email);
            }
            setUser(createdUser);
            return user;
        } else {
            setUser(null);
            return false;
        }
    }

    const signin = (email, password, callback) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userData = await handleUser(user);
                callback();
                return userData;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const signinWithGoogle = async (callback) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userData = await handleUser(user);
                callback();
                return userData;
            })
            .catch(error => {
                console.log(error);
            });
    }

    const updateUserData = async (updatedData) => {
        try {
            const updatedUser = await updateUser(user.uid, updatedData);
            setUser(updatedUser);
        } catch (error) {
            console.log(error);
        }
    }

    const signout = () => {
        signOut(auth)
            .then(() => {
                handleUser(false);
                clearCart();
                navigate('/');
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleUser);
        return () => unsubscribe();
    }, []);

    return {
        user,
        signin,
        signinWithGoogle,
        updateUserData,
        signout
    }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
