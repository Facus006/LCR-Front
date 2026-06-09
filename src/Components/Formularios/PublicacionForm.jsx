import React, { useState } from 'react'
import { subirPublicacion } from '../../Service/publicacionService'
import styles from '../../css/Forms.module.css'

export default function PublicacionForm() {
  const [titulo, setTitulo] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fotos, setFotos] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function crearPublicacion(e) {
    e.preventDefault()
    if (!titulo.trim()) { setErrorMessage('El título está vacío'); return }
    if (!precio || precio == 0) { setErrorMessage('Ingresá un precio válido'); return }
    if (!descripcion.trim()) { setErrorMessage('La descripción está vacía'); return }

    setLoading(true)
    const formData = new FormData()
    formData.append('titulo', titulo)
    formData.append('precio', precio)
    formData.append('descripcion', descripcion)
    formData.append('categoria', categoria)
    fotos.forEach((foto) => formData.append('fotos', foto))

    try {
      await subirPublicacion(formData)
      setSuccessMessage('Publicación subida correctamente.')
      setErrorMessage('')
    } catch {
      setErrorMessage('Ocurrió un error al subir la publicación.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formCard}>

        <div className={styles.formHeader}>
          <span className={styles.formTag}>Admin</span>
          <h1 className={styles.formTitle}>Nueva Publicación</h1>
        </div>

        <form onSubmit={crearPublicacion} className={styles.form}>

          <div className={styles.field}>
            <label className={styles.label}>Título</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Nombre del mod..."
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>Precio</label>
              <input
                type="number"
                className={styles.input}
                placeholder="0"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Categoría</label>
              <select
                className={styles.select}
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Seleccionar...</option>
                <option value="RFACTOR">rFactor</option>
                <option value="PISTAS">Pistas</option>
                <option value="AUTOS">Mods Varios</option>
                <option value="ASSETTOCORSA">Assetto Corsa</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Descripción</label>
            <textarea
              className={styles.textarea}
              placeholder="Describí el mod, versión del juego, instrucciones de instalación..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Fotos</label>
            <label className={styles.fileLabel}>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {fotos.length > 0 ? `${fotos.length} archivo${fotos.length > 1 ? 's' : ''} seleccionado${fotos.length > 1 ? 's' : ''}` : 'Seleccionar imágenes'}
              <input
                type="file"
                className={styles.fileInput}
                onChange={(e) => setFotos([...fotos, ...e.target.files])}
                multiple
                accept="image/*"
              />
            </label>
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
                Subir Publicación
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
