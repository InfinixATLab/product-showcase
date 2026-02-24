import axios from "axios"

// baseUrl com constante API para chamar por todo o projeto
export const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
})
