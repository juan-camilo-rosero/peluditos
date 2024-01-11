import { changeToCreateAccount, createUser, validateUser } from "./account.js"
import { appearDiv, dissappearDiv } from "./transitions.js"
import { validateAccountInfo } from "./validations.js"

const d = document,
$closeLogin = d.querySelector(".close-account"),
$openLogin = d.querySelector(".user-img"),
$loginBtn = d.querySelector(".login-btn"),
$user = d.querySelector("#email-account"),
$password = d.querySelector("#password-account"),
$changeToCreate = d.querySelector(".create-account")

d.addEventListener("DOMContentLoaded", e => {
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