import {crearNuevoPost,mostrarPosts, auth, eliminarPost}from '../lib/fnFirebase.js'
import {onSnapshot}from "firebase/firestore";
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
  const articleComments = document.createElement('article');
  //validacion. Al publicar, se debe validar que exista contenido en el input crearpost.
  btnEnviar.addEventListener('click',()=>{
  if(crearPost.value === ''){
    alert('ingresa texto')
  }else{
  console.log(crearPost.value)
  crearNuevoPost(crearPost.value)
  }
 })
 //visualizar la publicacion
  onSnapshot(mostrarPosts(), (querySnapshot) => {
    articleComments.innerHTML = ''
    querySnapshot.forEach((doc) => {
     console.log(doc.data().text);
     const articlePost = document.createElement('article')
     const p = document.createElement('p')
     p.textContent = doc.data().text
     p.setAttribute('data-userid', doc.data().uid);
     const btnBorrar = document.createElement('button')
     btnBorrar.className = 'btnBorrar';
     btnBorrar.value =doc.id;
     btnBorrar.textContent = 'Eliminar';
     // btnBorrar.type = 'submit';btnBorrar.style.display = 'none';
     articlePost.appendChild(p)
     if(doc.data().uid === auth.currentUser.uid){
      articlePost.appendChild(btnBorrar);     
     }
     articleComments.appendChild(articlePost)
    })
    const allbuttons = document.querySelectorAll('.btnBorrar')
    // recorrer cada boton
    allbuttons.forEach((btn)=>{
     console.log(btn);
     // seleccionar todos los botones borrar
     btn.addEventListener('click',(e)=>{
     //   e.stopPropagation();
     const id = e.target.value;
     console.log(id, '******')
     //pide una confirmacion antes de eliminar el post
     const opcion =confirm('¿Estás seguro que quieres eliminar este post?');
     console.log(opcion);
     if(opcion === true){
     eliminarPost(id);//vusualizo la eliminacion
     }
    });
  });
 });
 
 article.append(h1,h2,crearPost,btnEnviar, articleComments)//imgGoogle,
 return article;
};
