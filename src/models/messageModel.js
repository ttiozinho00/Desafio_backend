/*src/models/messageModel.js*/
const { pool } = require('../config/db'); // Importa a conexão do db.js

// Função para salvar o log da mensagem no banco de dados
exports.saveMessageLog = async (phone, message, status) => {
  const query = 'INSERT INTO message_logs (phone, message, status) VALUES ($1, $2, $3)';
  const values = [phone, message, status];

  try {
    await pool.query(query, values); // Executa a query para salvar o log
    console.log('Log da mensagem salvo com sucesso');
  } catch (error) {
    console.error('Erro ao salvar o log da mensagem:', error);
    throw error;
  }
};
