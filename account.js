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
        alert("Usuario o contraseña inválidos")
        return false
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
}

export async function createUser(email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKeys.firebase}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Usuario creado exitosamente");
            return data;
        } else {
            // Hubo un error en la creación del usuario
            alert("Error al crear el usuario");
            return false;
        }
    } catch (error) {
        console.error('Error de red:', error.message);
    }
}

export function changeToCreateAccount() {
    d.querySelector(".account-title h2").textContent = "Crear cuenta"
    d.querySelector(".continue-with-google p").textContent = "crear con google"
    d.querySelector(".create-account").textContent = "iniciar sesión"
    d.querySelector(".create-account").addEventListener("click", e => changeToLogin())
    d.querySelector(".login-btn").textContent = "Crear cuenta"
    d.querySelector(".login-btn").setAttribute("data-state", "create")
}

export function changeToLogin() {
    d.querySelector(".account-title h2").textContent = "Iniciar sesión"
    d.querySelector(".continue-with-google p").textContent = "continuar con google"
    d.querySelector(".create-account").textContent = "¿no tienes cuenta?"
    d.querySelector(".login-btn").textContent = "Ingresar"
    d.querySelector(".login-btn").setAttribute("data-state", "login")
    d.querySelector(".create-account").addEventListener("click", e => changeToCreateAccount())
}