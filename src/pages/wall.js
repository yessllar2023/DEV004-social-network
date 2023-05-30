import {crearNuevoPost,mostrarPosts, auth, eliminarPost, editarPost }from '../lib/fnFirebase.js'//
import {onSnapshot}from "firebase/firestore";
export const wall = () => {
 // crea contenedor principal
 const h1 = document.createElement('h1');
 const h2 = document.createElement('h2');
 const articleFlexWall = document.createElement('article');
  articleFlexWall.className = "flexWall";
  h1.textContent = 'Hola';
  h1.className='h1Wall'
  h2.textContent = 'Algun tips o una ruta RodAndo';
  h2.className='h2Wall'

  //aqui se crean las publicaciones
  const crearPost = document.createElement('input')
  crearPost.className='crearPost'
  crearPost.placeholder = '¿Qué quieres publicar?'
  const btnEnviar = document.createElement('button')
  btnEnviar.className = 'btnEnviar'
  btnEnviar.textContent = 'Enviar'

  //validacion. Al publicar, se debe validar que exista contenido en el input crearpost.
  btnEnviar.addEventListener('click',()=>{
    if(crearPost.value === ''){
      alert('ingresa texto')
    }else{
     console.log(crearPost.value)
     crearNuevoPost(crearPost.value)
    }
  })

  const articleComments = document.createElement('article');
  articleComments.className = 'articleComments'
  //visualizar la publicacion
  onSnapshot(mostrarPosts(),(querySnapshot) => {
    //en este article habitan los post
   articleComments.innerHTML = ''
   querySnapshot.forEach((doc) => {
     console.log(doc.data().text);
     //en ete articule va cada post con su parrafo ¿mas botones de eliminar y editar?
     const articlePost = document.createElement('article')
     articlePost.className = 'articlePost'
     const p = document.createElement('p')
     p.className = 'p'
     p.textContent = doc.data().text;
     p.setAttribute('data-userid', doc.data().uid);

     // aqui agregamos al article post el boton de eliminar
     const btnBorrar = document.createElement('button')//pasar luego a 'img' de basurero
     btnBorrar.className = 'btnBorrar';
     btnBorrar.value =doc.id;
     btnBorrar.textContent = 'Eliminar';
     // btnBorrar.type = 'submit';btnBorrar.style.display = 'none';
     
     const btnEditar = document.createElement('button')//pasar luego a 'img' de ¿?
     btnEditar.className = 'btnEditar';
     btnEditar.value = doc.id;
     //agregar ruta de imagen btnEditar.src = 
     btnEditar.textContent = 'Editar';
 
     //este es el article de la edicion incluye input de edicion y boton de modificacion
     const articleEditar = document.createElement("article");
     articleEditar.className = 'articleEditar'

     // console.log("Document written with ID: ", docRef.id);
     //boton para enviar la modificacion
     const btnEnviarModificacion = document.createElement('button');
     btnEnviarModificacion.className = 'btnEnviarModificacion'
     //innerText nos permite cambiar el contenido de texto o cosultar su valor
     btnEnviarModificacion.innerText='Enviar Cambios';
     //creo un input para modificar el post
     const inputModificar = document.createElement('input');
     inputModificar.className = 'inputModificar'
     // oculto con none el input y el boton de modificacion
     inputModificar.style.display = "none";
     btnEnviarModificacion.style.display = "none";

      // ESCUCHA EN BOTON EDITAR POST
      btnEditar.addEventListener('click', (e/*,doc.id,doc.data().mensaje*/) =>{
        e.preventDefault();
        console.log('valor de DOC.ID :', doc.id);
        console.log('valor de DOC.DATA :', doc.data().text);

        inputModificar.style.display = "block";
        btnEnviarModificacion.style.display = "block";
        
        btnEnviarModificacion.addEventListener('click',function () {
          console.log('Input modificar :', inputModificar.value);

          editarPost(doc.id,inputModificar.value).then(() =>{
            alert('Tu publicacion fue modificada');
            console.log(' Tu publicacion fue modificada');
          });  
        });
      });

      articleEditar.append(inputModificar, btnEnviarModificacion);
      articlePost.appendChild(p)
      if(doc.data().uid === auth.currentUser.uid){
        articlePost.append(btnBorrar, btnEditar);  
        articlePost.appendChild(articleEditar);
   }
      articleComments.appendChild(articlePost)
    })
    //aqui seleciionamos el mensaje para borrar
    const allbuttons = document.querySelectorAll('.btnBorrar')
    // recorrer cada boton
    allbuttons.forEach((btn)=>{
     console.log(btn);
     // seleccionar todos los botones borrar
     btn.addEventListener('click',(e)=>{
       //e.stopPropagation();
       const id = e.target.value;
       console.log(id, '******')
       //pide una confirmacion antes de eliminar el post
       const opcion =confirm('¿Estás seguro que quieres eliminar este post?');
       console.log(opcion);
       if(opcion === true){
          eliminarPost(id);//visualizo la eliminacion
        }
      });
    });
  });

  /*orden de acciones en editar post
  1.-creo boton editar y registro un value en su id 
  2..-ingreso un llamado para el boton editar
  3.- le indico dentro de las llaves unnuevo imput para el nuevo texto
  4.- indicar un block para nuevo input y un none para que se oculte
  5.- solicito confirmacion de acualizacion de post
  6.- debe dar true ¿pero que y cuando?
  */
  articleFlexWall.append(h1,h2,crearPost,btnEnviar, articleComments)//imgGoogle,
  return articleFlexWall;

};
