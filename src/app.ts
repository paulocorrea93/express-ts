// console.log("Express + TS!!!");

import express, {Request, Response} from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello Express!");
});

app.get("/api/product/interfaces", (req: Request, res: Response) => {
    return res.send("tipando rotas")
})

app.post("/api/product", (req, res) => {
  console.log(req.body);
  return res.send("Produto adicionado.");
});

app.all("/api/product/check", (req, res) => {
  if (req.method === "POST") {
    return res.send("Postou algo.");
  } else if (req.method === "GET") {
    return res.send("Leu algo");
  } else {
    res.send("Não podemos realizar essa operação.");
  }
});

app.listen(3000, () => {
  console.log("Aprlicação TS + Express funcionando!");
});
