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
    const $imgDiv = d.querySelector(imgDiv),
    $url = d.querySelector(url)

    if($url.value !== ""){
        $imgDiv.innerHTML = `<img src="${$url.value}">`

        const $img = d.querySelector(`${imgDiv} img`)

        $img.addEventListener("error", e => {
            $imgDiv.innerHTML = `<p>La imagen ingresada es inválida</p>`
        })
    }
    else $imgDiv.innerHTML = ""

    $url.addEventListener("focusout", e => {
        if($url.value !== ""){
            $imgDiv.innerHTML = `<img src="${$url.value}">`
    
            const $img = d.querySelector(`${imgDiv} img`)
    
            $img.addEventListener("error", e => {
                $imgDiv.innerHTML = `<p>La imagen ingresada es inválida</p>`
            })
        }
        else $imgDiv.innerHTML = ""
    })

}