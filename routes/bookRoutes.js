const { createBook, getAllBook, getBookById, updateDataBook, updateBook, deleteBook } = require('../controllers/bookController')
const { authUser } = require('../middleware/authentication')
const { authorizeAdmin } = require('../middleware/authorization')

const router = require('express').Router()

router.post('/book', authUser, authorizeAdmin, createBook)
router.get('/book', getAllBook),
router.get('/book/:id', getBookById)
router.put('/book/:id', authUser, authorizeAdmin, updateDataBook)
router.patch('/book/:id', authUser, authorizeAdmin, updateBook)
router.delete('/book/:id', authUser, authorizeAdmin, deleteBook)

module.exports = router