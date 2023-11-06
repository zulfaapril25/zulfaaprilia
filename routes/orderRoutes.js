
const { createOrder, getAllOrder, getOrderById, updateDataOrder, updateOrder, deleteOrder } = require('../controllers/orderController')
const { authUser } = require('../middleware/authentication')
const { authorizeOrder } = require('../middleware/authorization')

const router = require ('express').Router()

router.post('/order', authUser, createOrder)
router.get('/order', authUser, getAllOrder)
router.get('/order/:id', authUser, authorizeOrder, getOrderById)
router.put('/order/:id', authUser, authorizeOrder, updateDataOrder)
router.patch('/order/:id', authUser, authorizeOrder, updateOrder)
router.delete('/order/:id', authUser, authorizeOrder, deleteOrder)

module.exports = router