import React, { useState } from 'react'
import { usuarioForm } from '../../Service/UserService'
import styles from '../../css/Forms.module.css'

export default function UsuarioRegistro() {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const crearPublicacion = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const user = {
      username: form.username.value,
      password: form.password.value,
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      country: form.country.value,
    }
    try {
      await usuarioForm(user)
      window.location.href = '/'
    } catch (error) {
      setErrorMessage(error.message)
      setSuccessMessage('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formCard}>

        <div className={styles.formHeader}>
          <span className={styles.formTag}>Comunidad</span>
          <h1 className={styles.formTitle}>Crear Cuenta</h1>
          <p className={styles.formSub}>
            ¿Ya tenés cuenta? <a href="/login" className={styles.formLink}>Iniciá sesión</a>
          </p>
        </div>

        <form onSubmit={crearPublicacion} className={styles.form}>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>Nombre</label>
              <input className={styles.input} type="text" name="firstname" placeholder="Juan" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Apellido</label>
              <input className={styles.input} type="text" name="lastname" placeholder="García" required />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" name="username" placeholder="tu@email.com" required />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Contraseña</label>
            <input className={styles.input} type="password" name="password" placeholder="••••••••" required />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>País</label>
            <input className={styles.input} type="text" name="country" placeholder="Argentina" required />
          </div>

          {errorMessage && (
            <div className={styles.alertError}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className={styles.alertSuccess}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {successMessage}
            </div>
          )}

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? (
              <span className={styles.btnLoader} />
            ) : (
              <>
                Registrarse
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
