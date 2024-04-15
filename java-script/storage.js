import { agregarAlDoc, obtenerObjeto} from './funciones.js';

export function iniciarSesion(){

//FORMULARIO
 let pagina = document.getElementById("seccion-inicio");
 let contenedor = document.createElement('div');

 pagina.innerHTML = "";
 const formulario = `
    <form id="formulario">
        <div class="row g-3 align-items-center formulario-inicio">
            <!--Usuario-->
            <div class="col-auto">
                <label for="userName" class="form-label">Nombre de Usuario</label>
                <input type="text" class="form-control" id="userName">
            </div>
        </div>
        <button type="submit" class="btn btn-primary texto btn-inicio">Iniciar Sesion</button>
    </form>
    `;
    
    contenedor.innerHTML = formulario;

    pagina.appendChild(contenedor)

   let elementoFormulario = document.getElementById("formulario")
 
    elementoFormulario.addEventListener('submit', tomarDatosDeUsuario)
    
}

function tomarDatosDeUsuario(event){
    event.preventDefault();

    const usuario = document.getElementById('userName').value;//sin .value no funciona --> Toma lo que ingreso el usuaurio
    console.log(usuario);
   
    if(usuario === ''){
        alert("Por favor, ingrese un nombre válido");
        return;
    }
    
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
    
    if((!usuarioLogueado) || (usuario !== usuarioLogueado.nombre)){
        alert("Se ha creado un nuevo usuario");

        const nuevoUsuario = {
            nombre: usuario,
            likes: []
        };

        localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

    }else{
        alert("BIENVENIDO/A DE VUELTA "+usuarioLogueado.nombre);
        if(usuarioLogueado.likes !== null){
            actualizarEstadoDeObjetos(usuarioLogueado);
        }
    }
    document.getElementById("formulario").style.display = "none";
    agregarAlDoc();

}
function actualizarEstadoDeObjetos(usuario){ 
    let arrayLikes = usuario.likes;//array que guarda el id (titulo) de las peliculas
    
    arrayLikes.forEach((id) => {
        let objetoPelicula = obtenerObjeto(id);
        if(objetoPelicula){
            objetoPelicula.like = true;
        }
    })
}

//codigo html
/* <form id="formulario">
            <div class="row g-3 align-items-center">
                <!--Usuario-->
                <div class="col-auto">
                    <label for="userName" class="form-label">Nombre de Usuario</label>
                    <input type="email" class="form-control" id="userName">
                </div>
                <!--Contraseña-->
                <div class="col-auto">
                    <label for="password" class="col-form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password">
                </div>

                <div class="col-auto">
                    <span id="passwordHelpBlock" class="form-text">
                        Su Contraseña debe contener entre 8-20 caracteres, y no debe contener espacio ni caracteres especiales.
                    </span>
                </div>
            </div>
            <button type="submit" class="btn btn-primary texto">Iniciar Sesion</button>
        </form>
*/