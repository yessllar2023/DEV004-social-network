import { onNavigate } from '../router';
import { loginEmailPassword, signInWithGoogle} from '../lib/fnFirebase';
export const home = () => {
  // crea contenedor principal
  // modifica propiedades de los elemento
  // retorna el elemento
 const h1Home = document.createElement('h1')
  const article = document.createElement('article');
  article.className = "flexHome";
  const formHome = document.createElement('form')
  formHome.className = 'formHome'
  const email = document.createElement('input')
   const password = document.createElement('input')
    const btnSignIn = document.createElement('button')
    btnSignIn.className = 'btnSignIn'
    const btnGoogle = document.createElement('button')
    btnGoogle.className = 'btnGoogle'
    const btnRegister = document.createElement('button')
    //const imgGoogle = document.createElement('img'); 
    //imgGoogle.className = 'imgGoogle';
    //imgGoogle.src = google.png;
    btnRegister.className = 'btnRegister'
    email.setAttribute('type', 'email')
    email.setAttribute('class', 'email')
    password.setAttribute('type', 'password')
    password.setAttribute('class','password')
    h1Home.textContent = 'Bienvenid@s a RodAndo'
    email.placeholder='Ingresa tu correo aquí'
    password.placeholder='Y tu contraseña aquí'
    btnSignIn.textContent = 'Inicia sesión'
    btnGoogle.textContent = 'Inicia sesión con google'
    btnRegister.textContent = 'Registrate'


    btnSignIn.addEventListener('click', ()=>{
        console.log('Signin ok', email.value, password.value);
        loginEmailPassword(email.value, password.value).then((respuesta)=>{
          console.log(respuesta);
          onNavigate('/wall')
        }).catch(()=>{
          alert('No estas registrado, aprovecha y registrate')
        })
    })

    btnGoogle.addEventListener('click', ()=>{
       console.log('google ok');
        signInWithGoogle('google ok').then(()=>{
        onNavigate('/wall');
      })
  })
     //Aqui copias firebase// console.log(respuesta);//traer funcion loginGoogle
        // manejas la promesa con then //dentro del then llamas a onNavigate para que te lleve al muro

    btnRegister.addEventListener('click', ()=>{
        console.log('Register ok');
        onNavigate('/register');
    })
  
    article.append(h1Home,formHome, email, password, btnSignIn, btnGoogle, btnRegister)//imgGoogle,
      return article;
};
