import axios from "axios";
import db from "../db/connection.js";

export async function buscarCEP(cep) {
  const [rows] = await db.execute("SELECT * FROM enderecos WHERE cep = ?", [cep]);

  if (rows.length > 0) {
    return { origem: "banco", ...rows[0] };
  }

  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  const data = response.data;

  if (data.erro) {
    throw new Error("CEP não encontrado na API.");
  }

  await db.execute(
    "INSERT INTO enderecos (cep, logradouro, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?)",
    [data.cep, data.logradouro, data.bairro, data.localidade, data.uf]
  );

  return { origem: "api", ...data };
}
