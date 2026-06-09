import styles from "../css/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.topBar} />

      <div className={styles.inner}>

        {/* Branding */}
        <div className={styles.brand}>
          <span className={styles.logoAccent}>LCR</span>
          <span className={styles.logoSub}>MODS</span>
          <p className={styles.tagline}>Siempre ready para el show deaa.</p>
        </div>

        {/* Links */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Categorías</p>
          <a href="/categoria/RFACTOR" className={styles.link}>rFactor</a>
          <a href="/categoria/ASSETTOCORSA" className={styles.link}>Assetto Corsa</a>
          <a href="/categoria/PISTAS" className={styles.link}>Pistas</a>
          <a href="/categoria/AUTOS" className={styles.link}>Mods Varios</a>
        </div>

        {/* Comunidad */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Comunidad</p>
          <a href="https://www.youtube.com/@LimandoCarter" target="_blank" rel="noreferrer" className={styles.link}>YouTube</a>
          <a href="https://discord.gg/25DSjh55" target="_blank" rel="noreferrer" className={styles.link}>Discord</a>
          <a href="https://www.facebook.com/LIMANDOCARTERRFACTOR" target="_blank" rel="noreferrer" className={styles.link}>Facebook</a>
        </div>

      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>&copy; 2024 Limando Carter Rfactor. Todos los derechos reservados.</span>
        <span className={styles.flag}>🏁</span>
      </div>

    </footer>
  );
}

