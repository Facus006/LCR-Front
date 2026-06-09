import React, { useEffect } from 'react'
import { useState } from 'react'
import { getone } from '../../Service/publicacionService'
import { useParams } from 'react-router-dom';
import '../../css/styles.css';
import Producto from '../Secundarios/Producto';

//Este componente es para renderizar una publicacion.
export default function Publicacion() {
  const { id } = useParams(); //Aqui creamos una variable id que obtenemos el valor a travez de la ruta (link).
  const [publicacion, setPublicacion] = useState({ //Creamos una variable de estado de una publicacion
    titulo: 'No se encontro la publicacion', //LLene algunos campos porque si la api no encuentra la publicacion, se cargara una por defecto con esta informacion.
    fotos: [],
    descripcion: 'Error pareciera ser que no existe la publicacion',
    precio: 0,
    categoria: '',
    fechaPublicacion: ''
  });
  useEffect(() => {
    getone(id).then(data => setPublicacion(data))
  }, []) //Aqui llamamos al servicio para obtener la publicacion.
  return (
    //Aqui llamamos al componente card para renderizar la publicacion 
      <Producto publicacion={publicacion} />
  );
}