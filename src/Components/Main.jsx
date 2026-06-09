import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAllPublicacionesdestacadas } from '../Service/publicacionService'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaCards from './Secundarios/ListaCards';
import Loader from './Secundarios/Loader';
import Carousel from 'react-bootstrap/Carousel';
import GRAB_010 from '../Images/GRAB_010.JPG'
import GRAB_015 from '../Images/GRAB_015.JPG'
import IMG_0047 from '../Images/IMG_0047.JPG'
import '../css/main.css';


//Este es la pagina principal "/"
export default function Main() {
    const [publicaciones, setPublicacion] = useState([]) //Hacemos una variable de estado para traer las publicaciones de la api.
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const tiempoCarga = setTimeout(() => {
            getAllPublicacionesdestacadas().then(data => {
                setPublicacion(data)
                setCargando(false);
            })
        }, 1000);
    }, []) //Utilizamos el useEffect para llamar al servicio para que traiga las publicaciones principales de la api.

    return (
        <div >
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img src={GRAB_010} alt="Nombre de la imagen" className="imagen-main" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={GRAB_015} alt="Nombre de la imagen" className="imagen-main"/>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={IMG_0047} alt="Nombre de la imagen" className="imagen-main" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            {
                cargando ? (
                    <Loader /> // Mostrar el componente de carga mientras se carga la data
                ) : (
                    <ListaCards publicaciones={publicaciones} />
                )
            }
        </div >
    );
}