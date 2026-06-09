import React, { useState } from 'react'
import { userlogin } from '../../Service/UserService'
import styles from '../../css/Forms.module.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await userlogin(username, password)
      window.location.href = '/'
    } catch {
      setError('Los datos ingresados son incorrectos. Comprobá y volvé a intentar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formCard}>

        <div className={styles.formHeader}>
          <span className={styles.formTag}>Cuenta</span>
          <h1 className={styles.formTitle}>Iniciar Sesión</h1>
          <p className={styles.formSub}>
            ¿No tenés cuenta? <a href="/register" className={styles.formLink}>Registrate</a>
          </p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="tu@email.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Contraseña</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className={styles.alertError}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? (
              <span className={styles.btnLoader} />
            ) : (
              <>
                Ingresar
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  )
}
