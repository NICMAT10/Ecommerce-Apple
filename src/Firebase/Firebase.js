import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCKfhiZhnUXD_D3HcF9L4TVuiefgBdaaBo",
  authDomain: "apple-ea369.firebaseapp.com",
  projectId: "apple-ea369",
  storageBucket: "apple-ea369.appspot.com",
  messagingSenderId: "201046500065",
  appId: "1:201046500065:web:77210faae81870037dcda0"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)

export const storage = getStorage(app)