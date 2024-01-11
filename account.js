import apiKeys from "./api_keys.js";

const d = document,
ls = localStorage

export async function validateUser(user, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKeys.firebase}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          password,
          returnSecureToken: true,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("inicio de sección exitoso");
        return data
      } else {
        // Hubo un error en el inicio de sesión
        alert("Usuario o correo inválidos")
        return false
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
}