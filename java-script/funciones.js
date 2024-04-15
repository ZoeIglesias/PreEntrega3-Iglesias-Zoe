import Pelicula from "./pelicula.js";
import { arrayPeliculas } from './varGlobales.js';
import {agregarAMisPeliculas} from './manejoEventos.js'
//-----------------------------FUNCIONES---------------------------------------//
//-----------------LOGICA PARA AGREGAR LAS PELIS AL DOC HTML------------------//
export function agregarAlDoc() {

  let moviesContainer = document.getElementById("espacio-peliculas");
  let cantidadColumnas = 0;

  moviesContainer.innerHTML = "";
  arrayPeliculas.forEach((pelicula) => {
    if (cantidadColumnas == 4) {
      //Permite que solo se muestren 4 peliculas por fila
      agregarFila(moviesContainer); // Si ya hay cuatro pelis --> Se agrega una fila
    }

    let columna = document.createElement("div");
    columna.classList.add("col-md-3");

    let infoPelicula = crearEsqueleto(pelicula);

    columna.innerHTML = infoPelicula;

    moviesContainer.appendChild(columna);
    
    cantidadColumnas++;

   
  });

  //VERIFICA ESTADO (color) DE LOS BOTONES Y SUS CLASES 
  clasesBotonLike();
  
  
  // Asignar eventos de clic a los botones de like
  let botonesLike = moviesContainer.querySelectorAll(".btn-like");// selecciono todos los botones
  botonesLike.forEach((boton) => { //para cada boton --> "addEventListener"
    boton.onclick = function (event) {
      event.preventDefault();
      agregarAMisPeliculas(boton);
    };
  });
  
  
}

export function crearEsqueleto(pelicula) {//se crea todo el contenido del 'cobteiner' para cada pelicula
  let i = 0;
  let generosAMostrar = "";
  for (i = 0; i < 2; i++) {
    generosAMostrar += pelicula.generos[i];

    if (i == 0) {
      //Si es el primer genero
      generosAMostrar += " | ";
    }
  }

  let informacion = `
          <div class="pelicula" id="${pelicula.titulo}">
              <div class= "secuencia">
                <h3 class="titulo-pelicula">${pelicula.titulo}</h3>
                <p>Direccion: ${pelicula.director}</p>
                <p>Duracion: ${pelicula.duracion} min</p>
                <div class="buttons-container">
                  <button class="btn-like" id="likeMovie">
                  <i class="fa-solid fa-heart"></i>
                  </button>
                </div>
              </div>
              <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="img-fluid">
              <p class="genero-pelicula">${generosAMostrar}</p>
          </div>
      `;


  
  return informacion;
}
export function crearEsqueletoSimplificado(pelicula) {//se crea todo el contenido del 'conteiner' para cada pelicula
  let i = 0;
  let generosAMostrar = "";
  for (i = 0; i < 2; i++) {
    generosAMostrar += pelicula.generos[i];

    if (i == 0) {
      //Si es el primer genero
      generosAMostrar += " | ";
    }
  }

  let informacion = `
          <div class="pelicula" id="${pelicula.titulo}">
              <div class= "secuencia">
                <h3 class="titulo-pelicula">${pelicula.titulo}</h3>
                <p>Direccion: ${pelicula.director}</p>
                <p>Duracion: ${pelicula.duracion} min</p>
              </div>
              <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="img-fluid">
              <p class="genero-pelicula">${generosAMostrar}</p>
          </div>
      `;


  
  return informacion;
}

export function agregarFila(divContenedor) {
  let fila = document.createElement("div");
  fila.classList.add("row");
  divContenedor.appendChild(fila);

}

function agregarPelicula(pelicula) {
  /*let pelicula = crearObjetoPelicula(titulo, imagen, genero);*/
  arrayPeliculas.push(pelicula);
}

export function crearObjetoPelicula(titulo,imagen,genero,director,duracion){
  let nuevaPelicula = new Pelicula(titulo, imagen, genero, director, duracion);
  agregarPelicula(nuevaPelicula);
  return nuevaPelicula;
}

export function obtenerObjeto(id) {
    let objeto;
  
    objeto = arrayPeliculas.find((pelicula) => {
      return pelicula.titulo === id;
    });
  
    return objeto;
  }

export function clasesBotonLike(){ //PARA VERIFICAR EL COLOR DE LOS BOTONES (podria tmb pasarle el 'boton')
  let moviesContainer = document.getElementById("espacio-peliculas");
  let botonesLike = moviesContainer.querySelectorAll(".btn-like");
  botonesLike.forEach((boton) => {
      let peliculaId = boton.closest(".pelicula").id;
      let pelicula = obtenerObjeto(peliculaId);
      if (pelicula.like) {
          boton.classList.add("corazon-activo"); //SI ESTA EN WATCHLIST LE AGREGO LA CLASE PARA QUE CAMBIE DE COLOR
      } else {
          boton.classList.remove("corazon-activo");
      }
  });
}


