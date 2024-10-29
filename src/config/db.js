require('dotenv').config();
const { Pool } = require('pg');

// Certifica-se de que a senha está sendo passada como string
if (typeof process.env.DB_PASSWORD !== 'string') {
  console.error('A senha do banco de dados não está sendo interpretada como string');
}

// Configura a conexão com o banco de dados
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Função para testar a conexão
const connectDb = async () => {
  try {
    const client = await pool.connect(); // Conecta ao banco de dados
    console.log("Conectado ao banco de dados PostgreSQL");
    client.release(); // Libera o cliente para ser reutilizado
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados PostgreSQL", error);
  }
};

module.exports = {
  pool,
  connectDb
};
