const { Order, Transaction } = require('../models');
const logger = require('../logger.js');

const authorizeOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);

    if (!order) {
      logger.error('Pemesanan tidak ditemukan');
      return res.status(404).json({ message: 'Pemesanan tidak ditemukan' });
    }

    if (order.userId !== req.authUser.id) {
      logger.error('Akses ditolak untuk pemesanan ID ' + orderId);
      return res.status(403).json({ message: 'Anda tidak punya akses data ini' });
    }
    next();
  } catch (error) {
    logger.error('Terjadi kesalahan saat meng-otorisasi pemesanan: ', { stack: error.stack });
    res.status(500).json({ message: 'Terjadi kesalahan saat meng-otorisasi pemesanan' });
  }
};

const authorizeTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      logger.error('Transaksi tidak ditemukan');
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    const orderId = transaction.orderId;
    const order = await Order.findByPk(orderId);

    if (!order) {
      logger.error('Pemesanan tidak ditemukan');
      return res.status(404).json({ message: 'Pemesanan tidak ditemukan' });
    }

    // Memeriksa otorisasi berdasarkan ID order
    if (order.userId !== req.authUser.id) {
      logger.error('Akses ditolak untuk transaksi ID ' + transactionId);
      return res.status(403).json({ message: 'Anda tidak memiliki akses ke transaksi ini' });
    }

    next();
  } catch (error) {
    logger.error('Terjadi kesalahan saat meng-otorisasi transaksi: ', { stack: error.stack });
    res.status(500).json({ message: 'Terjadi kesalahan saat meng-otorisasi transaksi' });
  }
};

const authorizeAdmin = (req, res, next) => {
  const { admin } = req.authUser;

  if (!admin) {
    logger.error('Akses ditolak untuk pengguna non-admin', { stack: error.stack });
    return res.status(403).json({ message: 'Akses hanya untuk user admin' });
  }
  next();
};

module.exports = { authorizeOrder, authorizeTransaction, authorizeAdmin };
