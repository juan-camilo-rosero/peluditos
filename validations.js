import giphy_keys from "./imgbb_keys.js"

const d = document

export function validateInputs(img, name, desc) {
    const nameVal = d.querySelector(name).value,
    descVal = d.querySelector(desc).value,
    imgVal = d.querySelector(img)
    try {
        if(!nameVal) return "Debes ingresar un nombre"
        if(!descVal) return "Debes ingresar una descripción"
        if(!imgVal) return "Debes ingresar una imagen válida"
        if(nameVal.length >= 20) return "El nombre es muy largo"
        if(descVal.length >= 50) return "La descripción es muy larga"

        return true
    } catch (err) {
        return ("Algún input es inválido")
    }
}

export function showImage(imgDiv, url) {
    const $imgDiv = d.querySelector(imgDiv)
    $imgDiv.innerHTML = `<img src="${url}" alt="Tu gatito">`
}

export async function uploadToImgBB (image) {
    const formData = new FormData();
    formData.append('image', image);
  
    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${giphy_keys.secret}`, {
          method: 'POST',
          body: formData
        });

        console.log(response);
    
        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.data.url;
          return imageUrl;
        } else {
          console.error('Error al subir la imagen:', response.statusText);
          return null;
        }
    } catch (error) {
        console.error('Error de red:', error);
        return null;
    }
}

export function validateAdoptForm(name, email) {
    const nameRegex = /^[a-zA-Z\s]{2,}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
    return nameRegex.test(name) && emailRegex.test(email)
}

export function validateAccountInfo(user, password) {
    // Verifica si tanto el usuario como la contraseña no están vacíos
    if (user && password) {
        // Verifica si el usuario es un correo electrónico válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(user);

        // Verifica si la contraseña tiene al menos 6 caracteres
        const isPasswordValid = password.length >= 6;

        // Retorna true si tanto el usuario como la contraseña son válidos
        return isEmailValid && isPasswordValid;
    } else {
        // Retorna false si el usuario o la contraseña están vacíos
        return false;
    }
}
