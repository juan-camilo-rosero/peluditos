import stripe_keys from "./stripe_keys.js"
import { validateAdoptForm } from "./validations.js";

const d = document

export async function createCat(image, name, desc) {

    try {
        const imageVal = d.querySelector(image).getAttribute("src"),
        nameVal = d.querySelector(name).value,
        descVal = d.querySelector(desc).value,
        
        catParams = {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${stripe_keys.secret}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(nameVal)}&description=${encodeURIComponent(descVal)}&images[]=${encodeURIComponent(imageVal)}`
        },
    
        productRes = await fetch("https://api.stripe.com/v1/products", catParams),
        data = await productRes.json()

        location.href = "https://peluditos1.vercel.app/gatitos.html"

    } catch (err) {
        console.log(err);
    }
}

async function deleteCat(btn) {
    const $btn = d.querySelector(btn)

    $btn.addEventListener("click", async e => {

        if (!validateAdoptForm(d.getElementById("adopt-name").value, d.getElementById("adopt-email").value)) {
            alert("Nombre o email inválidos")
            return   
        }

        const id = $btn.getAttribute("data-product"),
        params = {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${stripe_keys.secret}`,
            }
        },
        res = await fetch(`https://api.stripe.com/v1/products/${id}`, params)

        if(res.ok) location.href = "https://peluditos1.vercel.app/gracias.html"
    
        else {
            const errorData = await res.json()
            alert('Oh no, ocurrió un error:', errorData.error)
        }
    })

}

export async function getCats(catalog) {
    const $catalog = d.querySelector(catalog),
    params = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${stripe_keys.secret}`,
          'Content-Type': 'application/json',
        }
    },
    res = await fetch("https://api.stripe.com/v1/products", params),
    data = await res.json(),
    cats = data.data

    cats.forEach(cat => {
        $catalog.innerHTML += `
        <figure>
            <img src="${cat.images[0]}" alt="${cat.name}">
            <h4 class="cat-name">${cat.name}</h4>
            <p class="cat-desc">${cat.description}</p>
            <button class="adopt-cat">Adoptar</button>
        </figure>`
    });

    const $btns = d.querySelectorAll(".adopt-cat")

    $btns.forEach(($btn, i) => {
        $btn.addEventListener("click", e => {
            const cat = cats[i]

            d.getElementById("adopt-form").classList.remove("hidden")
            d.querySelector(".adopt-submit").setAttribute("data-product", cat.id)
        })
    });

    deleteCat(".adopt-submit")
}