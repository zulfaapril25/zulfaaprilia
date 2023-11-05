const { Book, Order } = require('../models');
const  logger = require('../logger.js')

//POST
const createBook = async (req, res) => {
    try {
        const {title, author, publicationYear, stock, price, description} = req.body

        const newBook = await Book.create({
            title: title,
            author: author,
            publicationYear: publicationYear,
            stock: stock,
            price: price,
            description: description
        }); 
        logger.info('Buku berhasil diupload', {
             bookID: newBook.id });

        res.status(200).json(newBook);
    }catch(error){
        logger.error('Error dalam meng-upload buku', { stack: error.stack });
        res.status(500).json({ error: error.message });
       } 
    }

//GET DATA

const getAllBook = async(req, res) => {
   try{
        const book = await Book.findAll()
        res.status(200).json({ book });
    
   } catch (error){
        logger.error('Error dalam mendapatkan data buku', { stack: error.stack });
        res.status(404).json({ message: 'Buku tidak ditemukan' });
   }
    }

//GET BY ID
const getBookById = async(req, res) => {
    try{
        const { id } = req.params;
        const book = await Book.findByPk(id, {
           include: [
            {
                model: Order,
                as: 'orders'
            }
           ]
        });
        
        if (book === null){
            logger.error('Buku tidak ditemukan', { bookID: id });
            return res.status(404).json({ 
                error :'Book tidak ditemukan'
            });
        }

        res.status(200).json(book);
    } catch (error) {
        logger.error('Error dalam mendapatkan data buku by id', { stack: error.stack });
        res.status(500).json({ error: error.message });
    }
}


//PUT
const updateDataBook = async (req, res) => {
        try{
            //mendapatkan req params -> mendapatkan data movie berdasarkan id
            const { id } = req.params
            //mendapatkan req body
            const {title, author, publicationYear, stock, price, description} = req.body

            const book = await Book.findByPk(id)
            if (!book) {
                logger.error('Buku tidak ditemukan untuk diperbarui');
                return res.status(404).json({
                    error: 'Buku Tidak ditemukan'
                });
            }
            //update
            book.title = title
            book.author = author
            book.publicationYear = publicationYear
            book.stock = stock
            book.price = price
            book.description = description
            book.updateAt = new Date()

            //save data
            book.save()
            logger.info('Buku berhasil diperbarui', { bookID: id });
            //response
            res.status(200).json(book);
        } catch(error) {
            logger.error('Error dalam memperbarui data buku by ID', { stack: error.stack });
            res.status(500).json({ error: error.message });
    }
        }
    
    

    //PATCH
    const updateBook = async (req, res) => {
        try{
            //mendapatkan req params -> mendapatkan data movie berdasarkan id
            const { id } = req.params
            //mendapatkan req body
            const { stock, price } = req.body
            const book = await Book.findByPk(id)
            if (!book) {
                logger.error('Buku tidak ditemukan untuk diperbarui', { bookID: id });
                return res.status(404).json({
                    error: 'Buku Tidak ditemukan'
                });
            }
            //update
            book.stock = stock || book.stock
            book.price = price || book.price;
            book.updateAt = new Date()

            //save data
            book.save()
            logger.info('Buku berhasil diperbarui', { bookID: id });
            //response
            res.status(200).json(book);
        } catch(error) {
            logger.error('Error dalam memperbarui harga buku by ID', { stack: error.stack });
            res.status(500).json({ error: error.message });
        }
    }

//DELETE
    const deleteBook = async (req, res) => {
        try{
            const { id } = req.params 
            const book = await Book.findByPk(id)

            if (!book) {
                logger.error('Buku tidak ditemukan untuk dihapus', { bookID: id });
                res.status(404).json({ message: `Buku dengan id ${book.id} tidak ditemukan` });
            }
            book.destroy()
            
            res.status(200).json({ message: `Buku dengan judul ${book.title} berhasil dihapus` });

        }catch(error){
            logger.error('Error dalam menghapus buku', { stack: error.stack });
            res.status(500).json({ error: error.message });
        }
    }

module.exports = {createBook, getAllBook, getBookById, updateDataBook, updateBook, deleteBook}