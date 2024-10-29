const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');
const os = require('os');

const chromePath = os.platform() === 'win32' 
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : '/usr/bin/google-chrome';

const createClient = () => {
  return new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" }),
    puppeteer: {
      headless: false,
      executablePath: chromePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    },
    webCache: false
  });
};

let client = createClient();

const initializeClient = () => {
  client.on('authenticated', () => {
    console.log('AUTHENTICATED');
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('disconnected', (reason) => {
    console.log('Client was logged out:', reason);
    client = createClient(); // Cria uma nova instância do cliente
    initializeClient(); // Re-inicializa o evento
    client.initialize(); // Reinicia o cliente
  });

  client.initialize();
};

initializeClient();

const sendMessageToWhatsApp = async (phone, message) => {
  try {
    await client.sendMessage(phone, message);
    console.log(`Message sent to ${phone}`);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

module.exports = { sendMessageToWhatsApp };
