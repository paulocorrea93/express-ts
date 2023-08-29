// console.log("Express + TS!!!");

import express from "express";

const app = express()

app.get("/", (req, res) => {
    return res.send("Hello Express!")
})

app.listen(3000, () => {
    console.log("Aprlicação TS + Express funcionando!")
})