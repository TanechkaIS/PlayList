//Definir una clase Music Player
class MusicPlayer {
    //Constructor que recibe la música del playlist (musicList) argumento
    constructor(musicList) {
        this.musicList=musicList; //Asigna la lista de música que recibe del atributo musicList que se encuentra en MusicPlayer
        this.index = 0; //Inicializa el índice de canciones en a número 1
    }
    //Método getMusic() que devuelva la canción actual en la función índice
    getMusic() {
        return this.musicList[this.index]; //Devuelve la canción en la posición del índice actual dentro de la lista de música
    }
    //Método next() que avanza a la siguiente canción de la lista
    next() {
        if (this.index + 1 < this.musicList.length) {//Comprueba si el índice está dentro del rango de la música
        this.index ++; //Si es así, incrementa el índice 
    }
        else {
            //Si el siguiente índice está fuera del rango de lista de la music
            this.index = 0;
        }
    }
    //Método que hace retroceder de canción de índice prev()
    prev() {
        if (this.index != 0) { //Si no es cero, disminuye uno
        this.index--;// si no es cero, disminuye uno
       } 
       else { //Si el índice actual es 0
        this.index = this.musicList.length - 1;
       }
    }
}