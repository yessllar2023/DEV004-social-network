import { crearUsuario } from '../lib/fnFirebase.js';
import { onNavigate } from '../router.js';

export const register = () => {
  // crea contenedor principal
  const section = document.createElement('section');
  section.className = "flexRegister";
  const buttonHome = document.createElement('button');
  buttonHome.className = 'buttonHome'
  const h1Register = document.createElement('h1');
  h1Register.className = "h1Register";
  h1Register.textContent = 'Pront@ a Rodar...';
  const inputEmail = document.createElement('input');
  inputEmail.className = 'inputEmail'
  const inputPassword = document.createElement('input');
  inputPassword.className = 'inputPassword'
  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'buttonRegister'
 
  // modifica propiedades de los elemento
  inputEmail.setAttribute('type', 'email');
  inputPassword.setAttribute('type', 'password');
  buttonRegister.textContent = 'Registrate';
  buttonHome.textContent = 'Volver al home';
  buttonRegister.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
     crearUsuario(inputEmail.value, inputPassword.value).then(()=>{
      onNavigate('/wall');
     })
   // console.log(inputEmail.value, inputPassword.value);
  });
  buttonHome.addEventListener('click', () => {
    // llama funcion navigate y pasa string con la ruta
    onNavigate('/');
  });
  // suman elementos a contenedor madre
  section.append(buttonHome, h1Register, inputEmail, inputPassword, buttonRegister);
  // retorna contenedor madre
  return section;
};