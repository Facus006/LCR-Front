import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../../css/Card.module.css'

export default function Card({ publicacion }) {
  const [current, setCurrent] = useState(0)
  const fotos = publicacion.fotos?.length > 0 ? publicacion.fotos : null

  function prev(e) {
    e.preventDefault()
    setCurrent((c) => (c - 1 + fotos.length) % fotos.length)
  }

  function next(e) {
    e.preventDefault()
    setCurrent((c) => (c + 1) % fotos.length)
  }

  return (
    <div className={styles.card}>

      {/* Imagen */}
      <NavLink to={`/one/${publicacion.id}`} className={styles.imgWrap}>
        {fotos ? (
          <>
            <img
              src={`http://localhost:8080/imagen/${fotos[current].id}`}
              alt={`Foto ${current}`}
              className={styles.img}
            />
            {fotos.length > 1 && (
              <>
                <button className={`${styles.arrow} ${styles.arrowL}`} onClick={prev} aria-label="Anterior">
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className={`${styles.arrow} ${styles.arrowR}`} onClick={next} aria-label="Siguiente">
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className={styles.dots}>
                  {fotos.map((_, i) => (
                    <span key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <img src="/imagenPorDefecto.jpg" alt="Sin imagen" className={styles.img} />
        )}

        {/* Badge categoría */}
        {publicacion.categoria && (
          <span className={styles.badge}>{publicacion.categoria}</span>
        )}
      </NavLink>

      {/* Info */}
      <div className={styles.info}>
        <NavLink to={`/one/${publicacion.id}`} className={styles.titleLink}>
          <h5 className={styles.title}>{publicacion.titulo}</h5>
        </NavLink>
        <p className={styles.desc}>{publicacion.descripcion}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${publicacion.precio}</span>
          <NavLink to={`/one/${publicacion.id}`} className={styles.btn}>
            Ver mod
            <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </NavLink>
        </div>
      </div>

    </div>
  )
}
