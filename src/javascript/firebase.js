import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABqx2NlFH-3YWxDrZNS0hUkxFUkdKwhdc",
  authDomain: "aquateamlanding.firebaseapp.com",
  projectId: "aquateamlanding",
  storageBucket: "aquateamlanding.appspot.com",
  messagingSenderId: "26097129232",
  appId: "1:26097129232:web:37362a82ee5c29b534b795"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función exportable actualizada
export const saveVote = async (voteValue, userName) => {
  try {
    await addDoc(collection(db, "encuesta_compra"), {
      nombre: userName,      // Guardamos el nombre
      interesado: voteValue, // "SI" o "NO"
      fecha: new Date(),
      dispositivo: navigator.userAgent
    });
    return true;
  } catch (e) {
    // Este log es vital para saber POR QUÉ falla
    console.error("Error CRÍTICO guardando voto en Firebase: ", e);
    return false;
  }
};