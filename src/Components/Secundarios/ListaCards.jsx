import Card from './Card'
import styles from '../../css/ListaCards.module.css'

export default function ListaCards({ publicaciones }) {
  return (
    <div>
      {publicaciones.length > 0 ? (
        <div className={styles.grid}>
          {publicaciones.map((publicacion) => (
            <Card key={publicacion.id} publicacion={publicacion} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyTag}>404</span>
          <p className={styles.emptyText}>No hay publicaciones disponibles.</p>
        </div>
      )}
    </div>
  )
}
