import { arrayPeliculas, arrayMisPeliculas} from './varGlobales.js';
import {obtenerObjeto, crearEsqueletoSimplificado, agregarFila, agregarAlDoc} from './funciones.js'
//---------------FUNCIONALIDADES--------------------//

// 1.) BUSCAR
export function buscador() {
    let valorInput = document.getElementById("buscador-id").value; //sin .value no funciona --> Toma lo que ingreso el usuaurio
  
    valorInput = valorInput.toLowerCase();
  
    let arrayObtenido;
  
    arrayObtenido = buscarSegunNombre(valorInput);
  
    if (arrayObtenido.length <= 0) {
      arrayObtenido = buscarSegunDirector(valorInput);
    }

    if (arrayObtenido.length <= 0) {
      arrayObtenido = filtrarPorGenero(valorInput);
      console.log("filtro por genero")
    }

    console.log(arrayObtenido);
  
    mostrarEnPantalla(arrayObtenido);
}
  
  
function buscarSegunNombre(tituloPelicula) {
    let pelicualsEncontradas = arrayPeliculas.filter((pelicula) => {
      return pelicula.titulo.toLowerCase() === tituloPelicula; //sin el return no funca
    });
  
    return pelicualsEncontradas;
}
  
function buscarSegunDirector(director) {
    let pelicualsEncontradas = arrayPeliculas.filter((pelicula) => {
      return pelicula.director.toLowerCase() === director; //sin el return no funca
    });
  
    return pelicualsEncontradas;
}
  
export function mostrarEnPantalla(arrayObtenidoPeliculas) { //MOVER A FUNCIONES
  //TODO: //Funcion parecido a agregar al Doc --> Abstraer
    let moviesContainer = document.getElementById("espacio-peliculas");
    moviesContainer.innerHTML = ""; // Para borrar las peliculas del incio, sino se sobreescriben

    if(arrayObtenidoPeliculas.length === 0){
      let informacion = `
      <div class="avisoNoHayPelicula">
        <h1 class="aviso">NO HAY PELÍCULAS PARA MOSTRAR</h1>
        <button class ="btn-home" id="btn-voler-inicio">VOLVER AL INICIO
        <i class="fa-solid fa-house"></i>
        </button>
      </div>
  `;
        
    moviesContainer.innerHTML = informacion;
    // Agregar evento de clic al botón para volver al inicio
    let btnVolverInicio = document.getElementById("btn-voler-inicio");
    btnVolverInicio.onclick = function (event) {
      event.preventDefault();
      agregarAlDoc()
    }
  } 
    
    let cantidadColumnas = 0;
  
    arrayObtenidoPeliculas.forEach((pelicula) => {
      if (cantidadColumnas == 4) {
        //Permite que solo se muestren 4 peliculas por fila
        agregarFila(moviesContainer); // Si ya hay cuatro pelis --> Se agrega una fila
        cantidadColumnas = 0;
      }
  
      let columna = document.createElement("div");
      columna.classList.add("col-md-3");
  
      let infoPelicula = crearEsqueletoSimplificado(pelicula); //para que no se vean los botones
  
      columna.innerHTML = infoPelicula;
  
      moviesContainer.appendChild(columna);
  
      cantidadColumnas++;
    });
}

function filtrarPorGenero(genero){

  let peliculasFiltradas = arrayPeliculas.filter( (pelicula) => {
    //return pelicula.generos.includes(genero)
    return pelicula.generos.map(g => g.toLowerCase()).includes(genero);
  });

  return peliculasFiltradas;

}

// 2.) AGREGAR A LISTA --> MIS PELICULAS
export function agregarAMisPeliculas(boton) {
  let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  let peliculaAsociada = boton.closest(".pelicula");
  let objetoPelicula = obtenerObjeto(peliculaAsociada.id);
  console.log(objetoPelicula);
  
  objetoPelicula.meGusta();
  console.log(objetoPelicula.like);
  
  if (objetoPelicula.like) {
      boton.classList.add("corazon-activo");
      if ((objetoPelicula != null) && !(usuarioGuardado.likes.includes(objetoPelicula.titulo))) {
          usuarioGuardado.likes.push(objetoPelicula.titulo); // Guardar solo el título de la película (ID)
          localStorage.setItem("usuario", JSON.stringify(usuarioGuardado)); // Actualizar el usuario guardado en el almacenamiento local
      }
  } else {
      boton.classList.remove("corazon-activo");
      let indice = usuarioGuardado.likes.findIndex((titulo) => titulo === objetoPelicula.titulo);
      usuarioGuardado.likes.splice(indice, 1);
      localStorage.setItem("usuario", JSON.stringify(usuarioGuardado)); 
  }
}
/*export function agregarAMisPeliculas(boton) {
    let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    let peliculaAsociada = boton.closest(".pelicula"); //Quiero el CONTEINER que tiene toda la info de la peli
    
    let objetoPelicula = obtenerObjeto(peliculaAsociada.id); //Obtengo el OBJETO

    objetoPelicula.meGusta();
    console.log(objetoPelicula.like)
    console.log(usuarioGuardado.likes);

    if (objetoPelicula.like) { //Verifico si el 'click' fue like o dislike
      boton.classList.add("corazon-activo");
      if ((objetoPelicula != null) && !(usuarioGuardado.likes.includes(objetoPelicula.titulo))) {
        usuarioGuardado.likes.push(objetoPelicula);//la agrego a mi lista de peliculas
        localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
      } else {
        console.log("Error 404: No se ha encontrado el objeto");
      }

    } else {
      boton.classList.remove("corazon-activo");
      let indice = usuarioGuardado.likes.findIndex((pelicula) => pelicula.id === objetoPelicula.id);
        usuarioGuardado.likes.splice(indice, 1);//la saco a mi lista de peliculas
        localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
      
    }
    /*  if (objetoPelicula.like) { //Verifico si el 'click' fue like o dislike
      boton.classList.add("corazon-activo");
      
      if (!usuarioGuardado.likes.find( (p) => p.id === objetoPelicula.id)) {
        usuarioGuardado.likes.push(objetoPelicula);//la agrego a mi lista de peliculas
      } 

    } else {
      boton.classList.remove("corazon-activo");
      let indice = usuarioGuardado.likes.findIndex((pelicula) => pelicula.id === objetoPelicula.id);
      if (index !== -1) {
        usuarioGuardado.likes.splice(index, 1);
    }
    }
    //usuario.likes = arrayMisPeliculas.map(pelicula => pelicula.titulo);
    //localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
    
}*/

