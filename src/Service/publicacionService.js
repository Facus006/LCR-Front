import { getToken } from './UserService';

const API_URL = "http://localhost:8080/publicacion";

export async function getAll() {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();
    return data;
}

export async function getAllPublicacionesdestacadas() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}

export async function busquedaPublicaciones(consulta) {
    try {
        const response = await fetch(`${API_URL}/buscar/${consulta}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener ninguna publicación');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getone(id) {
    try {
        const response = await fetch(`${API_URL}/one/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la publicación');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function obtenerPublicacionesPorCategoria(categoria) {
    try {
        const response = await fetch(`${API_URL}/categoria/${categoria}`);
        if (!response.ok) {
            throw new Error('Error al obtener las publicaciones por categoría');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function subirPublicacion(formData) {
    const token = getToken();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }

        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('No tienes permisos para acceder a esta ruta.');
            }
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        return await response.text();
    } catch (error) {
        throw error;
    }
}

export async function editarPublicacion(formData, id) {
    const token = getToken();
    try {
        const response = await fetch(`${API_URL}/editar/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('No tienes permisos para acceder a esta ruta.');
            }
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        return await response.text();
    } catch (error) {
        throw error;
    }
}

export async function eliminarPublicacionDestacada(id) {
    const token = getToken();
    try {
        const response = await fetch(`${API_URL}/destacadaE/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('No tienes permisos para acceder a esta ruta.');
            }
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error al eliminar publicación destacada:', error.message);
        throw error;
    }
}

export async function agregarPublicacionDestacada(id) {
    const token = getToken();
    try {
        const response = await fetch(`${API_URL}/destacadaA/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('No tienes permisos para acceder a esta ruta.');
            }
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error al agregar publicación destacada:', error.message);
        throw error;
    }
}

export async function eliminarPublicacion(id) {
    const token = getToken();
    try {
        const response = await fetch(`${API_URL}/eliminar/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('No tienes permisos para acceder a esta ruta.');
            }
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error al eliminar publicación:', error.message);
        throw error;
    }
}