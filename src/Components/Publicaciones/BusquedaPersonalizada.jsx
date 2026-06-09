import React, { useEffect, useState } from 'react'
import { busquedaPublicaciones } from '../../Service/publicacionService'
import ListaCards from '../Secundarios/ListaCards'
import { useParams } from 'react-router-dom'
import Loader from '../Secundarios/Loader'
import styles from '../../css/Publicaciones.module.css'

export default function BusquedaPersonalizada() {
  const { consulta } = useParams()
  const [publicaciones, setPublicaciones] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await busquedaPublicaciones(consulta)
        setPublicaciones(data)
      } catch {
        // no results
      } finally {
        setCargando(false)
      }
    }
    fetchData()
  }, [consulta])

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.headerTag}>Búsqueda</span>
          <h1 className={styles.headerTitle}>"{consulta}"</h1>
          {!cargando && (
            <p className={styles.headerSub}>
              {publicaciones.length} resultado{publicaciones.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {cargando ? (
          <Loader />
        ) : publicaciones.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <p className={styles.emptyText}>No se encontraron mods para esa búsqueda.</p>
            <a href="/" className={styles.emptyLink}>Volver al inicio</a>
          </div>
        ) : (
          <ListaCards publicaciones={publicaciones} />
        )}
      </div>
    </div>
  )
}
