import { createCat } from "./stripe_api.js"
import { appearDiv, dissappearDiv } from "./transitions.js"
import { showImage, uploadToImgBB, validateInputs, validateAccountInfo } from "./validations.js"
import { changeToCreateAccount, createUser, validateUser } from "./account.js"

const d = document,
$leaveBtn = d.querySelector(".leave"),
$fileInput = d.getElementById("image"),
$closeLogin = d.querySelector(".close-account"),
$openLogin = d.querySelector(".user-img"),
$loginBtn = d.querySelector(".login-btn"),
$user = d.querySelector("#email-account"),
$password = d.querySelector("#password-account"),
$changeToCreate = d.querySelector(".create-account")

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
    $closeLogin.addEventListener("click", e => dissappearDiv("#account"))
    $openLogin.addEventListener("click", e => appearDiv("#account"))
    $changeToCreate.addEventListener("click", e => changeToCreateAccount())
    $loginBtn.addEventListener("click", async e => {
        if($loginBtn.getAttribute("data-state") === "login"){
            if(!validateAccountInfo($user.value, $password.value)) return alert("usuario o contraseña inválidos")
            const res = await validateUser($user.value, $password.value)
            if(res){
                dissappearDiv("#account")
                alert("Inicio de sesión exitoso")
            }
        }
        else if($loginBtn.getAttribute("data-state") === "create"){
            if(!validateAccountInfo($user.value, $password.value)) return alert("usuario o contraseña inválidos")
            const res = await createUser($user.value, $password.value)
            if(res){
                dissappearDiv("#account")
                alert("Usuario creado exitosamente")
            }
        }
    })
})