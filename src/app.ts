// console.log("Express + TS!!!");

import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());

function showPath(req: Request, res: Response, next: NextFunction){
  console.log(req.path)
  next()
}

app.use(showPath)

app.get("/", (req, res) => {
  return res.send("Hello Express!");
});

app.get("/api/product/interfaces", (req: Request, res: Response) => {
  return res.send("tipando rotas");
});

app.get("/api/json", (req: Request, res: Response) => {
  return res.json({
    nome: "camisa",
    price: 19.99,
    stock: true,
    sizes: ["P", "M", "G"],
  });
});

app.get("/api/product/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  if (id === "1") {
    const product = {
      id: 1,
      name: "Boné",
      price: 10.99,
      stock: true,
    };
    return res.json(product);
  } else {
    return `Produto não encontrado.`;
  }
});

app.get("/api/product/:id/review/:reviewId", (req: Request, res: Response) => {
  const productId = req.params.id;
  const reviewId = req.params.reviewId;

  return res.send(`Está é a review: ${reviewId} do produto: ${productId}`);
});

function routerHandler(req: Request, res: Response) {
  console.log(`Encontrado usuário ${req.params.id}`);

  return res.send(`Usuário encontrado`);
}

app.get("/api/user/:id", routerHandler);

app.post("/api/product", (req, res) => {
  console.log(req.body);
  return res.send("Produto adicionado.");
});

function checkUser(req: Request, res: Response, next: NextFunction) {
  if (req.params.id === "1") {
    console.log(`Acesso liberado.`);
    next();
  } else {
    console.log(`Acesso restrito.`);
  }
}

app.get("/api/user/:id/access", checkUser, (req: Request, res: Response) => {
  return res.json({
    msg: "Bem-vindo a área administrativa."
  })
})

app.all("/api/product/check", (req, res) => {
  if (req.method === "POST") {
    return res.send("Postou algo.");
  } else if (req.method === "GET") {
    return res.send("Leu algo");
  } else {
    res.send("Não podemos realizar essa operação.");
  }
});

app.get("/api/user/:id/details/:name", (req: Request<{id: string, name: string}>, res: Response<{status: boolean}>) => {
    console.log(`ID: ${req.params.id}`)
    console.log(`Name: ${req.params.name}`)

    return res.json({status: true})
})

app.get("/api/error", (req: Request, res: Response) => {
  try {
      throw new Error("Algo deu errado.");
      
  } catch (e: any) {
    res.status(500).json({msg: e.message})
  }
})

app.listen(3000, () => {
  console.log("Aprlicação TS + Express funcionando!");
});