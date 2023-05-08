// Aqui viven las funciones de firebase
import { getAuth, createUserWithEmailAndPassword,
   signInWithEmailAndPassword, GoogleAuthProvider, 
   signInWithPopup } from "firebase/auth";
import { initializeApp } 
from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGZmoJ-RaGggbdOgeW9bCiSuPODvXmDUo",
  authDomain: "red-social-para-ciclistas.firebaseapp.com",
  projectId: "red-social-para-ciclistas",
  storageBucket: "red-social-para-ciclistas.appspot.com",
  messagingSenderId: "912100392403",
  appId: "1:912100392403:web:776b403d406cf38ee24326"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const crearUsuario = (email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      return errorMessage
    });
}

export const loginEmailPassword = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
}

export  const signInWithGoogle = () =>{
  //Aqui copias firebase
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    //const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });  
}



// Add a new document with a generated id.

 export async function crearNuevoPost(texto){
  const docRef = await addDoc(collection(db, "post"), {
    text: texto,
  });
  console.log("Document written with ID: ", docRef.id);
}

//detectar actualizaciones en tiempo real en firebae
//dentro Escucha varios documentos en una colección onshopp y otros
//pasos para compilacion de firebase:
//muestro firebase
//creo functionimporto fb dentro de import()
