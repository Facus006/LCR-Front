import React, { useEffect, useState } from 'react'
import { getAll } from '../../Service/publicacionService'
import { handleClickEliminarDestacada, handleClickAgregarDestacada, handleClickEliminar } from '../../Service/ServicioAdmin'
import styles from '../../css/ListadePublicaciones.module.css'

export default function ListadePublicaciones() {
  const [publicaciones, setPublicaciones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAll().then(data => {
      setPublicaciones(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerTag}>Admin</span>
            <h1 className={styles.headerTitle}>Lista de Publicaciones</h1>
          </div>
          <a href="/subirpublicacion" className={styles.btnNew}>
            + Nueva
          </a>
        </div>

        {/* Table */}
        {loading ? (
          <div className={styles.loadingRow}>
            <span className={styles.loader} />
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Título</th>
                  <th className={styles.th}>Categoría</th>
                  <th className={styles.th}>Fecha</th>
                  <th className={styles.th}>Destacada</th>
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {publicaciones.map(pub => (
                  <tr key={pub.id} className={styles.tr}>

                    <td className={styles.td}>
                      <span className={styles.titleCell}>{pub.titulo}</span>
                    </td>

                    <td className={styles.td}>
                      {pub.categoria && (
                        <span className={styles.badge}>{pub.categoria}</span>
                      )}
                    </td>

                    <td className={styles.td}>
                      <span className={styles.date}>{pub.fechaPublicacion}</span>
                    </td>

                    <td className={styles.td}>
                      {pub.destacada ? (
                        <button
                          className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                          onClick={() => handleClickEliminarDestacada(pub.id, publicaciones, setPublicaciones)}
                        >
                          Quitar destacada
                        </button>
                      ) : (
                        <button
                          className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                          onClick={() => handleClickAgregarDestacada(pub.id, publicaciones, setPublicaciones)}
                        >
                          Destacar
                        </button>
                      )}
                    </td>

                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <a href={`/edit/${pub.id}`} className={`${styles.iconBtn} ${styles.iconBtnEdit}`} title="Editar">
                          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                            <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                        <button
                          className={`${styles.iconBtn} ${styles.iconBtnDelete}`}
                          onClick={() => handleClickEliminar(pub.id, publicaciones, setPublicaciones)}
                          title="Eliminar"
                        >
                          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                            <path d="M3 4h10M6 4V3h4v1M5 4l.5 9h5L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {publicaciones.length === 0 && (
              <div className={styles.emptyState}>
                No hay publicaciones todavía.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
