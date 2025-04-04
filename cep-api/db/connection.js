import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "seu_usuario",
  password: "sua_senha",
  database: "cep_db",
});

await connection.execute(`
  CREATE TABLE IF NOT EXISTS enderecos (
    cep VARCHAR(9) PRIMARY KEY,
    logradouro VARCHAR(255),
    bairro VARCHAR(255),
    localidade VARCHAR(255),
    uf VARCHAR(2)
  )
`);

export default connection;
