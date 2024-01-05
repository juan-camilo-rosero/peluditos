import { createCat } from "./stripe_api.js"
import { showImage, validateInputs } from "./validations.js"

const d = document,
$leaveBtn = d.querySelector(".leave")

d.addEventListener("DOMContentLoaded", e => {
    $leaveBtn.addEventListener("click", e => {
        const validation = validateInputs(".show-image img", "#name", "#desc")
        if ( validation === true){
            console.log("valido :D");
            createCat("#image", "#name", "#desc")
        }
        else{
            alert(validation);
        }
    })
    showImage(".show-image", "#image")
})