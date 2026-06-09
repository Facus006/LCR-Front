import styles from '../../css/Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <div className={styles.car} />
      </div>
      <div className={styles.bars}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.bar} style={{ '--i': i }} />
        ))}
      </div>
      <span className={styles.label}>Cargando mods...</span>
    </div>
  )
}
