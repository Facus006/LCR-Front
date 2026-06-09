import { useState } from 'react'
import styles from '../../css/Producto.module.css'

export default function Producto({ publicacion }) {
  const [current, setCurrent] = useState(0)
  const fotos = publicacion.fotos?.length > 0 ? publicacion.fotos : null

  function prev() {
    setCurrent((c) => (c - 1 + fotos.length) % fotos.length)
  }
  function next() {
    setCurrent((c) => (c + 1) % fotos.length)
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* ===== GALERÍA ===== */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
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
                      <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button className={`${styles.arrow} ${styles.arrowR}`} onClick={next} aria-label="Siguiente">
                      <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <div className={styles.counter}>
                      {current + 1} / {fotos.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <img src="/imagenPorDefecto.jpg" alt="Sin imagen" className={styles.img} />
            )}
          </div>

          {/* Thumbnails */}
          {fotos && fotos.length > 1 && (
            <div className={styles.thumbs}>
              {fotos.map((foto, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
                  onClick={() => setCurrent(i)}
                >
                  <img
                    src={`http://localhost:8080/imagen/${foto.id}`}
                    alt={`Thumb ${i}`}
                    className={styles.thumbImg}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ===== DETALLES ===== */}
        <div className={styles.details}>

          {/* Header */}
          <div className={styles.header}>
            <span className={styles.categoria}>{publicacion.categoria}</span>
            <h1 className={styles.titulo}>{publicacion.titulo}</h1>
          </div>

          <div className={styles.divider} />

          {/* Descripción */}
          <p className={styles.descripcion}>{publicacion.descripcion}</p>

          {/* Metadata */}
          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Categoría</span>
              <span className={styles.metaValue}>{publicacion.categoria}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Publicado</span>
              <span className={styles.metaValue}>{publicacion.fechaPublicacion}</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Precio + CTA */}
          <div className={styles.buyRow}>
            <span className={styles.precio}>${publicacion.precio}</span>
            <button className={styles.btnCart}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Añadir al carrito
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

