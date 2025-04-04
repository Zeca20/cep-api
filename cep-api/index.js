import express from "express";
import bodyParser from "body-parser";
import cepRoutes from "./routes/cep.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/cep", cepRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
