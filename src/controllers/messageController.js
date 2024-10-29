/*src/controllers/messageController.js*/
const { messageQueue } = require('../queues/messageQueue');
const amqp = require('amqplib');

exports.sendMessage = async (req, res) => {
  const { phone, message } = req.body;

  // Enfileira a mensagem usando Bull
  try {
    await messageQueue.add({ phone, message });

    // Publica no RabbitMQ
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'messageQueue';
    await channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify({ phone, message })));
    await channel.close();
    await connection.close();

    return res.status(200).json({ message: 'Message queued for processing' });
  } catch (error) {
    console.error('Error processing message:', error);
    return res.status(500).json({ error: 'Failed to process message' });
  }
};
