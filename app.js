//DOM manejo de los componentes del html manejados por el javascript
//Creamos constantes
const container = document.querySelector(".container"); //Contenedor principal
const image = document.querySelector("#music-image"); //Elemento imagen
const title = document.querySelector("#music-details .title"); //Título
const singer = document.querySelector("#music-details .singer"); //Artista

//Botones de acción (# : identificador - id)
const prev = document.querySelector("#controls #prev"); //Canción anterior
const play = document.querySelector("#controls #play"); //Play
const next = document.querySelector("#controls #next"); //Canción siguiente

//Progresión de la música (Funcionan por separado, uno no depende de otro, por eso no hace falta indicar su div "padre")
const duration = document.querySelector("#duration"); //Duración de la canción
const currentTime = document.querySelector("#current-time"); //Tiempo recorrido de la canción
const progressBar = document.querySelector("#progress-bar"); //Progreso de la canción
const volume = document.querySelector("#volume"); //Volumen
const volumeBar = document.querySelector("#volume-bar"); //Barra del volumen
const ul = document.querySelector("ul"); // Lista de canciones

//Instancia de la MusicPlayer
const player = new MusicPlayer(musicList);

//Evento dentro del html para ejecutar una ventana que me diga que el programa y las canciones se han cargado
window.addEventListener("load", () => {
    let music = player.getMusic(); //Música actual
    displayMusic(music); //Mostrar los detalles de la canción
    displayMusicList(player.musicList); //Lista de reproducción
    isPlayingNow();//Comprueba si hay música reproduciéndose
});

//Función para mostrar los detalles de la música
function displayMusic(music) {
    //Título de la canción
    title.innerText = music.getName();
    //Artista
    //singer.innerText = music.singer; - No lo pongo porque estéticamente no me gusta que se repita el contenido
    //Imagen
    image.src = "img/" + music.img;
    //Archivo de reproducción (.ogg, .wav, .mp3)
    audio.src = "music/" + music.file;
}

//evento para los botones de reproducción y pausa, acciones predefinidas (click, mouseover, mousedown)
play.addEventListener("click", () => {
    //Constante que verifique la música que se reproduce
    const isMusicPlay = container.classList.contains("playing");
    //Al darle click de nuevo hace una pausa
    isMusicPlay ? pauseMusic() : playMusic();
});

//Evento click en los botones prev y next
prev.addEventListener("click", () => {
    //Código para el prev
    prevMusic(); 
});
next.addEventListener("click", () => {
    //Código para el next
    nextMusic();
});

//Acciones de reproducción de canciones correspondientes (anterior y posterior inmediata)
const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

//Acciones para pausar y play
const pauseMusic = () => {
    //Tiene que parar el playing
    container.classList.remove("playing");
    //Tiene que estar asociado a la etiqueta "i"
    //Tiene que aparecer el icono de pause || al darle click   
    play.querySelector("i").classList = "fa-solid fa-play";
    //El audio tiene que pausarse
    audio.pause();
}
//Acciones para continuar la canción
const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

const calculateTime = (totalSeconds) => {
    //Math.floor: Devuelve el máximo entero menor o igual a un número
    //Calcula el tiempo de tributo: minutos-segundos
    //Operación matemática que calcule los minutos divididos entre 60
    const seconds = Math.floor(totalSeconds/60);
    //Operación matemática que calcule los segundos en porcentaje (%)
    const minutes = Math.floor(totalSeconds % 60);
    //Operación que calcule el total de segundos y minutos
    const updateMinutes = minutes < 10? `0${minutes}`:`${minutes}`;
    //Nos genere el resultado (00:00) minutos : segundos (segundo)
    const result = `${seconds}:${updateMinutes}`;
    //Mostrar el resultado
    return result;
}

//Evento que calcula el tiempo de reproducción y el tiempo de la canción
audio.addEventListener("loadedmetadata", () => {
    //Solicitar la duración del audio
    duration.textContent = calculateTime(audio.duration);
    //Solicitar que la barra de progreso se mueva con el tiempo de la canción
    progressBar.max = Math.floor(audio.duration);
});
audio.addEventListener("timeupdate", () => {
    //Prograsión de la barra calculada en la anterior función y me muestre el valor
    progressBar.value = Math.floor(audio.currentTime);
    //Tiempo transcurrido
    currentTime.textContent = calculateTime(progressBar.value);
});

//Cuando mueva el botón de la barra de progreso, se actualice el tiempo izquierdo
progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

//Variable para gestionar la amplitud del audio (más o menos)
let soundStatus = "voice";

//Control del volumen del equipo usado
volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0) {
        audio.muted = true;
        soundStatus = "silent";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        soundStatus = "voice";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if(soundStatus==="voice") {
        audio.muted = true;
        soundStatus = "silent";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        soundStatus = "voice";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

//Función para mostrar la lista de reproducción
const displayMusicList = (list) => {
    for(let i=0; i < list.length; i++) {
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="music/${list[i].file}"></audio>
            </li>`

        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });
    }
}

//Selecciona una música de la lista de reproducción
const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");    
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

//Función para verificar que la música que suena es la de la lista
const isPlayingNow = () => {
    for(let li of ul.querySelectorAll("li")) {
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}
audio.addEventListener("ended", () => {
    nextMusic();
})
