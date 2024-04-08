//Definimos de la clase music
class Music {
    //constructor de la clase Music que inicializa con las propiedades de la música (title, singer, img, file)
    constructor(title,singer,img,file) {
           this.title=title; //Título de la canción
           this.singer=singer; //Artista
           this.img=img; //Imagen del audio
           this.file=file; //Archivo de audio
       }
   
    //Método para que me devuelva una cadena de texto que incluya title y singer
    getName() {
        return this.title + " - " + this.singer;
    }
}
//Agregar instancia de las canciones, Music
const musicList = [

    new Music ("Stand Up", "Cynthia Erivo", "standUp.jpg", "standUp.mp3"),

    new Music ("Never Enough", "Loren Allred", "neverEnough.jpg", "neverEnough.mp3"),

    new Music ("Before You Go", "Lewis Capaldi", "beforeYouGo.jpg", "beforeYouGo.mp3"),

    new Music ("Love In The Dark", "Jessie Reyez", "loveInTheDark.jpg", "loveInTheDark.mp3"),
    
    new Music ("Rise Up", "Andra Day", "riseUp.jpg", "riseUp.mp3"),

    new Music ("Million Reasons", "Lady Gaga", "millionReasons.png", "millionReasons.mp3"),

    new Music ("Stay With Me", "Sam Smith", "stayWithMe.png", "stayWithMe.mp3"),

    new Music ("Dancing With A Stranger", "Sam Smith & Normani", "dancindWithAStranger.png", "dancingWithAStranger.mp3")
];