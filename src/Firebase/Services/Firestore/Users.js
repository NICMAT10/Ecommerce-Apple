import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";

export const useUsers = () => {
   // Crear un nuevo usuario en la base de datos o actualizar sus datos.
  const createUser = async (uid, data) => {
    try {
      // Establecer los datos del usuario, fusionando los datos existentes.
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, data, { merge: true });
      // Obtener los datos del usuario después de la creación o actualización
      const user = await getDoc(userRef);
      const userData = user.data();
      // Si el usuario no tiene un rol, establecerlo como "user".
      if (!userData.role) {
        updateUser(userData.uid, { role: "user" });
      }

      return user.data();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (uid, data) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, data);
      const user = await getDoc(userRef);
      return user.data();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createUser,
    updateUser,
  };
};
