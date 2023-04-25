import { onNavigate } from '../router';
import { loginEmailPassword, signInWithGoogle} from '../lib/fnFirebase';
export const home = () => {
  // crea contenedor principal
  const article = document.createElement('article');
    const email = document.createElement('input')
    const password = document.createElement('input')
    const btnSignIn = document.createElement('button')
    const btnGoogle = document.createElement('button')
    const btnRegister = document.createElement('button')
    email.setAttribute('type', 'email')
    password.setAttribute('type', 'password')
    btnSignIn.textContent = 'Inicia sesion'
    btnGoogle.textContent = 'Inica sesion con google'
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
         //Aqui copias firebase
        // console.log(respuesta);
        //traer funcion loginGoogle
        // manejas la promesa con then
        onNavigate('/wall');
        //dentro del then llamas a onNavigate para que te lleve al muro
      })
  })

    btnRegister.addEventListener('click', ()=>{
        console.log('Register ok');
        onNavigate('/register');
    })
    article.append(email, password, btnSignIn, btnGoogle, btnRegister)
  return article;
};
