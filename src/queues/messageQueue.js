/*src/queues/messageQueue.js*/
const Queue = require('bull');
const { sendMessageToWhatsApp } = require('../services/whatsappService');
const { saveMessageLog } = require('../models/messageModel');

// Cria a fila Bull
const messageQueue = new Queue('messageQueue', {
  redis: { host: '127.0.0.1', port: 6379 }
});

// Define o manipulador (handler) para processar os trabalhos da fila
messageQueue.process(async (job) => {
  const { phone, message } = job.data;

  try {
    // Simula atraso de 5 segundos
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Envia a mensagem via WhatsApp
    await sendMessageToWhatsApp(phone, message);

    // Salva o log no Postgres
    await saveMessageLog(phone, message, 'Success');
  } catch (error) {
    console.error('Error processing message:', error);
    await saveMessageLog(phone, message, 'Failed');
    throw error; // Reenfileira automaticamente em caso de falha
  }
});

module.exports = { messageQueue };


