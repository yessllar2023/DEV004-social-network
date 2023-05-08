import {crearNuevoPost}
from '../lib/fnFirebase.js'
export const wall = () => {
  // crea contenedor principal
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const article = document.createElement('article');
  article.className = "flexWall";
  h1.textContent = 'Hola';
  h1.className='h1Wall'
  h2.textContent = 'Algun tips o una ruta RodAndo';
  h2.className='h2Wall'
  const crearPost = document.createElement('input')
  crearPost.className='crearPost'
  crearPost.placeholder = '¿Qué quieres publicar?'
  const btnEnviar = document.createElement('button')
  btnEnviar.className = 'btnEnviar'
  btnEnviar.textContent = 'Enviar'
  // retorna el elemento
  //return h1;

  //validacion
//Al publicar, se debe validar que exista contenido en el input crearpost.
btnEnviar.addEventListener('click',()=>{
  if(crearPost.value===''){
    alert('ingresa texto')

  }else{
  console.log(crearPost.value)
  crearNuevoPost(crearPost.value)
  }
})

//comportamiento
//Poder publicar un post.

//hu3 eliminar post 
//Poder eliminar un post específico.
//Pedir confirmación antes de eliminar un post.

 article.append(h1,h2,crearPost,btnEnviar)//imgGoogle,
return article;
};
