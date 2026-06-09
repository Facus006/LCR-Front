import { useEffect, useState } from 'react'
import { getAllPublicacionesdestacadas } from './Service/publicacionService'
import ListaCards from './Components/Secundarios/ListaCards'
import Loader from './Components/Secundarios/Loader'
import GRAB_010 from './Images/GRAB_010.JPG'
import GRAB_015 from './Images/GRAB_015.JPG'
import IMG_0047 from './Images/IMG_0047.JPG'
import styles from './PaginaPrincipal.module.css'

const SLIDES = [
  { img: GRAB_010, label: 'Assetto Corsa', sub: 'Los mejores mods de la comunidad LCR' },
  { img: GRAB_015, label: 'Assetto Corsa', sub: 'Autos y pistas hechos con pasión' },
  { img: IMG_0047, label: 'Assetto Corsa', sub: 'Siempre ready para el show deaa' },
]

export default function Main() {
  const [publicaciones, setPublicacion] = useState([])
  const [cargando, setCargando] = useState(true)
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  // Auto-avance cada 5s
  useEffect(() => {
    const timer = setInterval(() => goTo((prev) => (prev + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      getAllPublicacionesdestacadas().then(data => {
        setPublicacion(data)
        setCargando(false)
      })
    }, 1000)
    return () => clearTimeout(t)
  }, [])

  function goTo(indexOrUpdater) {
    if (animating) return
    setAnimating(true)
    setCurrent(typeof indexOrUpdater === 'function' ? indexOrUpdater(current) : indexOrUpdater)
    setTimeout(() => setAnimating(false), 600)
  }

  function prev() { goTo((current - 1 + SLIDES.length) % SLIDES.length) }
  function next() { goTo((current + 1) % SLIDES.length) }

  return (
    <div className={styles.page}>

      {/* ===== CARRUSEL ===== */}
      <div className={styles.carousel}>

        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
          >
            <img src={slide.img} alt={slide.label} className={styles.slideImg} />
            <div className={styles.overlay} />
            <div className={styles.caption}>
              <span className={styles.captionTag}>LCR MODS</span>
              <h2 className={styles.captionTitle}>{slide.label}</h2>
              <p className={styles.captionSub}>{slide.sub}</p>
            </div>
          </div>
        ))}

        {/* Controles */}
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots */}
        <div className={styles.dots}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Barra de progreso */}
        <div className={styles.progressBar} key={current}>
          <div className={styles.progressFill} />
        </div>

      </div>

      {/* ===== PUBLICACIONES DESTACADAS ===== */}
      <div className={styles.featured}>
        <div className={styles.featuredHeader}>
          <span className={styles.featuredTag}>01</span>
          <h2 className={styles.featuredTitle}>Destacados</h2>
        </div>
        {cargando ? <Loader /> : <ListaCards publicaciones={publicaciones} />}
      </div>

    </div>
  )
}
