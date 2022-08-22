import routes from "./routes";
import express from "express";

const app = express();

app.use(express.json(), routes);

app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000");
});
