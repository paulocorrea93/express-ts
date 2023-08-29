// console.log("Express + TS!!!");

import express from "express";

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    return res.send("Hello Express!")
})

app.post("/api/product", (req, res) => {
    console.log(req.body)
    return res.send("Produto adicionado.")
})

app.listen(3000, () => {
    console.log("Aprlicação TS + Express funcionando!")
})