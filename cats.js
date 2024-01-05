import { getCats } from "./stripe_api.js"

const d = document

d.addEventListener("DOMContentLoaded", e => {
    getCats(".cats")
})