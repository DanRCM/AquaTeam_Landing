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

// Función exportable
// Actualizamos para recibir 'reason'
export const saveVote = async (voteValue, userName, reason = "") => {
  try {
    await addDoc(collection(db, "encuesta_compra"), {
      nombre: userName || "Anónimo",
      interesado: voteValue,
      motivo_rechazo: reason, // Guardamos la razón (estará vacía si votan SI)
      fecha: new Date(),
      dispositivo: navigator.userAgent
    });
    return true;
  } catch (e) {
    console.error("Error guardando voto: ", e);
    return false;
  }
};