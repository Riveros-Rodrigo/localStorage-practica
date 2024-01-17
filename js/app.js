// Variables
const formulario = document.querySelector('#formulario')
const listarTweets = document.querySelector('#lista-tweets')
let tweets = [];
//Event listeners
eventListeners();
function eventListeners(){
    //cuando el usuario agrega nuevo tweet
    formulario.addEventListener('submit', agregarTweet)
    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets') || [])
        crearHtml()
    })
}
//Funciones
function agregarTweet(e){
    e.preventDefault();
    //text area
    const tweet = document.querySelector("#tweet").value; //para leer el valor del tweet que escribe el usuario

    //validaciones
    if(tweet === ''){
        mostrarError('El mensaje no puede ir vacio');
        return //evita que se ejecute mas lineas de codigo
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]
    //una vez agregado creo html
    crearHtml();
}

// mostrar mensaje error
function mostrarError(error){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error') //agrego el estilo de css

    //inserto el error a la vista
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);
    // elimina la alerta dsp de 3 seg
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

//Muestra listado de los tweets
function crearHtml(){
    limpiarHTML()
    if(tweets.length > 0){
        tweets.forEach( tweet =>{
            //agregar boton de eliminar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerHTML ="X"
            //añadir funcion de eliminar
            btnEliminar.addEventListener('click', () => {
                borrarTweet(tweet.id);
            })
            //crear html
            const li = document.createElement('li');
            //añadir el texto
            li.innerText = tweet.tweet;
            //asignar el boton de eliminar
            li.appendChild(btnEliminar)
            //insertar en el html
            listarTweets.appendChild(li);
        })
    }
    sincronizarStorage();
}
//agrega los tweets actuales a local storage
function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

//elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHtml()
}

//limpiar html
function limpiarHTML(){
    while(listarTweets.firstChild){
        listarTweets.removeChild(listarTweets.firstChild)
    }
}