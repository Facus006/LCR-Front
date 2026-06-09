import React, { useEffect, useState } from 'react'
import { obtenerPublicacionesPorCategoria } from '../../Service/publicacionService'
import ListaCards from '../Secundarios/ListaCards'
import { useParams } from 'react-router-dom'
import Loader from '../Secundarios/Loader'
import styles from '../../css/Publicaciones.module.css'

const CATEGORIA_LABELS = {
  RFACTOR: 'rFactor',
  ASSETTOCORSA: 'Assetto Corsa',
  PISTAS: 'Pistas',
  AUTOS: 'Mods Varios',
}

export default function PublicacionesxCategoria() {
  const { categoria } = useParams()
  const [publicaciones, setPublicaciones] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerPublicacionesPorCategoria(categoria).then(data => {
      setPublicaciones(data)
      setCargando(false)
    })
  }, [])

  const label = CATEGORIA_LABELS[categoria] ?? categoria

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.headerTag}>Categoría</span>
          <h1 className={styles.headerTitle}>{label}</h1>
          {!cargando && (
            <p className={styles.headerSub}>
              {publicaciones.length} publicación{publicaciones.length !== 1 ? 'es' : ''}
            </p>
          )}
        </div>

        {cargando ? (
          <Loader />
        ) : publicaciones.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 21V9" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
            <p className={styles.emptyText}>Aún no hay mods en esta categoría.</p>
            <a href="/" className={styles.emptyLink}>Volver al inicio</a>
          </div>
        ) : (
          <ListaCards publicaciones={publicaciones} />
        )}
      </div>
    </div>
  )
}
