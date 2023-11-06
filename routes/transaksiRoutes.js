
const { createTransaction, getAllTransaction, getTransaksiById, updateDataTransaksi, deleteTransaction } = require('../controllers/transactionController')
const { authUser } = require('../middleware/authentication')
const { authorizeTransaction } = require('../middleware/authorization')

const router = require ('express').Router()

router.post('/transaksi', authUser, createTransaction)
router.get('/transaksi', authUser, getAllTransaction)
router.get('/transaksi/:id', authUser, authorizeTransaction, getTransaksiById)
router.put('/transaksi/:id', authUser, authorizeTransaction, updateDataTransaksi)
router.delete('/transaksi/:id', authUser, authorizeTransaction, deleteTransaction)

module.exports = router