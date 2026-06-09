import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import PublicacionForm from './Components/Formularios/PublicacionForm'
import ListadePublicaciones from './Components/Publicaciones/ListadePublicaciones'
import PaginaPrincipal from './PaginaPrincipal'
import Publicacion from './Components/Publicaciones/Publicacion'
import PublicacionEditar from './Components/Formularios/PublicacionEditar'
import BusquedaPersonalizada from './Components/Publicaciones/BusquedaPersonalizada'
import PublicacionesxCategoria from './Components/Publicaciones/PublicacionesxCategoria'
import UsuarioRegistro from './Components/Formularios/UsuarioRegistro'
import Login from './Components/Formularios/Login'
import Footer from './Components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <main style={{ flex: 1 }}>
      <Routes>
        <Route path='/' element={<PaginaPrincipal />} />
        <Route path='/subirpublicacion' element={<PublicacionForm />} />
        <Route path='/listarPublicaciones' element={<ListadePublicaciones />} />
        <Route path="/one/:id" element={<Publicacion />} />
        <Route path="/edit/:id" element={<PublicacionEditar />} />
        <Route path="/buscar/:consulta" element={<BusquedaPersonalizada />} />
        <Route path="/categoria/:categoria" element={<PublicacionesxCategoria />} />
        <Route path="/register" element={<UsuarioRegistro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
       </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
