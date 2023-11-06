const winston = require('winston');

// Konfigurasi transport untuk menulis log ke file
const fileTransport = new winston.transports.File({ filename: 'app.log' });

// Konfigurasi format log
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${message} ${stack || ''}`;
  })
);

// Buat logger dengan transport dan format yang telah dikonfigurasi
const logger = winston.createLogger({
  level: 'info',
  format: logFormat, // Gunakan format yang telah dikonfigurasi
  transports: [fileTransport],
});

// Gunakan logger untuk mencatat pesan error
logger.error('Ini adalah pesan error.', { stack: 'Stack trace error di sini' });

// Gunakan logger untuk mencatat pesan info
logger.info('Ini adalah pesan info.');

module.exports = logger; // Export logger untuk digunakan di seluruh aplikasi Anda
