import { jwtDecode } from "jwt-decode";


const API_URL = "http://localhost:8080/auth";

async function usuarioForm(user) {

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(errorData.token);
        }
        // Para cualquier otro error HTTP, lanza un error genérico
        throw new Error('Error al registrar al usuario');
    }
    const data = await response.json();
    return data;
}

async function userlogin(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    const responseData = await response.json();
    const { token } = responseData;
    localStorage.setItem('token', token); // Guardar el token en localStorage

    return token;
}

function logout() {
    localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
}

function getToken() {
    return localStorage.getItem('token');
}

function isLoggedIn() {
    const token = getToken();
    return !!token; // Devuelve true si hay un token en localStorage, false si no
}
function isAdminLoggedIn(token) {
    if (!token) {
        return false; // Si no hay token, el usuario no está logueado
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.userRol === "ADMIN";
}
function tokenDecode() {
    const token = getToken();
    if (!token) {
        return false; // Si no hay token, el usuario no está logueado
    }
    const decodedToken = jwtDecode(token);
    return decodedToken;
}

export { usuarioForm, userlogin, logout, getToken, isLoggedIn, isAdminLoggedIn, tokenDecode };