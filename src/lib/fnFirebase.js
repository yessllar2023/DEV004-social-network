// Aqui viven las funciones de firebase
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, 
 GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore,query,doc, deleteDoc,
  Timestamp, orderBy, updateDoc } from "firebase/firestore";

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
export const auth = getAuth();
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
export  function crearNuevoPost(text){//async y await 
  const docRef = addDoc(collection(db, "post"), {
    text, //text:text,
    uid: auth.currentUser.uid, 
    email: auth.currentUser.email,  
    name: auth.currentUser.displayName,
    dateCreate: Timestamp.now(),
  });
  //console.log("Document written with ID: ", docRef.id);
}

export function mostrarPosts(){
  const q = query(collection(db, "post"), orderBy('dateCreate', 'desc'));
  return q
}
//borrar datos
export function eliminarPost(id){
  deleteDoc(doc(db, 'post', id));   
}

export function editarPost(id, texto){// en argumento seria(docId//id de documento, actualPost//un texto)
 const miRef = doc(db, 'post',id);//docRef (documento 'post' o campo'text')
 // Establecer el campo "post" del id
 return updateDoc(miRef, {
  text: texto,// seria nuevo texto o text
 });
};


