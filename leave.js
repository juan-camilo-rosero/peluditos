import { createCat } from "./stripe_api.js"
import { showImage, uploadToImgBB, validateInputs } from "./validations.js"

const d = document,
$leaveBtn = d.querySelector(".leave"),
$fileInput = d.getElementById("image")

d.addEventListener("DOMContentLoaded", e => {
    $leaveBtn.addEventListener("click", e => {
        const validation = validateInputs(".show-image img", "#name", "#desc")
        if ( validation === true){
            createCat(".show-image img", "#name", "#desc")
        }
        else{
            alert(validation);
        }
    })

    $fileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = await uploadToImgBB(file);
            showImage(".show-image", imageUrl)
        }
    })
    showImage(".show-image", "#image")
})