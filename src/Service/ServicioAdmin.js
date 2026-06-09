import { eliminarPublicacionDestacada } from './publicacionService';
import { agregarPublicacionDestacada } from './publicacionService';
import { eliminarPublicacion } from './publicacionService';
//Este servicio es para el admin.
//Esta funcion es para que pueda eliminar una pubicacion de destacadas.
export async function handleClickEliminarDestacada(id, publicaciones, setPublicaciones) { //Recibe como parametro el id de la publicacion a eliminar y una variable de estado para actualizar los cambios en la lista.
    try {
        await eliminarPublicacionDestacada(id); //Aqui llamamos a otro servicio para que se conecte con la api y elimine la publicacion de destacadas.
        setPublicaciones(publicaciones.map(pub => (pub.id === id ? { ...pub, destacada: false } : pub))); //Aqui actualiza el estado de publicaciones y se le pasa un nuevo array que verifica con el id si acaba de ser eliminado como destacado, si lo hace crea un nuevo objeto y le setea el detacada en false.
    } catch (error) {
        console.error('Error al eliminar la publicación destacada:', error.message); //Y aqui manejamos las exepciones.
    }
}
//Aqui hace basicamente lo mismo pero con algunos cambios.
export async function handleClickAgregarDestacada(id, publicaciones, setPublicaciones) {
    try {
        await agregarPublicacionDestacada(id);
        setPublicaciones(publicaciones.map(pub => (pub.id === id ? { ...pub, destacada: true } : pub))); //Aqui actualiza el estado de publicaciones y se le pasa un nuevo array que verifica con el id si acaba de ser marcado como destacado, si lo hace crea un nuevo objeto y le setea el detacada en true.
    } catch (error) {
        console.error('Error al agregar la publicación destacada:', error.message);
    }
}

export async function handleClickEliminar(id, publicaciones, setPublicaciones) {
    try {
        await eliminarPublicacion(id);
        setPublicaciones(publicaciones.filter(pub => pub.id !== id)); //Aqui lo que hace es actualizar el array que contiene las publicaciones y compara que las id con la que eliminamos para que no apareza en la lista.
    } catch (error) {
        console.error('Error al eliminar la publicación:', error.message);
    }
}