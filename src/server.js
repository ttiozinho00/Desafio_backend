/*src/server.js*/
require('dotenv').config({ path: './src/.env' });
const express = require('express');
const { sendMessage } = require('./controllers/messageController');
const { connectDb } = require('./config/db');
const { messageQueue } = require('./queues/messageQueue');

const app = express();
app.use(express.json());

app.post('/send-message', sendMessage);

connectDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
