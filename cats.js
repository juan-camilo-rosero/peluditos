import { getCats } from "./stripe_api.js"

const d = document

d.addEventListener("DOMContentLoaded", e => {
    getCats(".cats")
    d.querySelector(".close").addEventListener("click", e => d.getElementById("adopt-form").classList.add("hidden"))
})