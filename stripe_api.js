import stripe_keys from "./stripe_keys.js"

const d = document

export async function createCat(image, name, desc) {

    try {
        const imageVal = d.querySelector(image).value,
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

        location.href = "http://127.0.0.1:5500/frontend_development/Proyectos/gatitos/gatitos.html"

    } catch (err) {
        console.log(err);
    }
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
}