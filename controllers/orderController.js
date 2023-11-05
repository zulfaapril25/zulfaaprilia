const { Order, Book, Transaction } = require('../models')
const  logger = require('../logger.js');

//POST
const createOrder = async (req, res) => {
    try {
        const { bookId, name, address, date, qty, status} = req.body
        const user = req.authUser;
        const newOrder = await Order.create({
            userId: user.id,
            bookId,
            name,
            address,
            date ,
            qty,
            status
        });

        logger.info('Pemesanan berhasil dibuat', {
            orderID: newOrder.id
        });
      
          // Ambil data pesanan dengan buku yang telah dimuat
          const orderWithBooks = await newOrder.reload(
             {
                include:[
                    {
                        model: Book,
                        as: 'book'
                    }
                ]
          });

        res.status(200).json(orderWithBooks);
    }catch(error){
        logger.error('Error Membuat Pemesanan', { stack: error.stack });
        res.status(500).json({error:  '<-- Error Membuat Pemesanan'})
       } 
    }

//GET DATA
const getAllOrder = async(req, res) => {
   try{
const order = await Order.findAll({
    include:[
        {
            model: Book,
            as: 'book'
        },
        {
            model: Transaction,
            as: 'transaksi'
        }
    ]
   })
res.status(200).json({ order });
    
   }catch (error){
    logger.error('Error dalam mendapatkan data pemesanan', { stack: error.stack });
    res.status(404).json({ message: 'Pemesanan tidak ditemukan' });
   }
    }

//GET BY ID
const getOrderById = async(req, res) => {
    try{
        const { id } = req.params;
        const order = await Order.findByPk(id, {
           include: [
            {
                model: Book,
                as: 'book'
            },
            {
                model: Transaction,
                as: 'transaksi'
            }
           ]
        });
        
        if (order === null){
            logger.error('Pemesanan tidak ditemukan', { id });
            return res.status(404).json({ 
                error :'Pemesanan tidak ditemukan'
            });
        }

        res.status(200).json(order);
    } catch (error) {
        logger.error('Error dalam mendapatkan data pemesanan dengan Id', { stack: error.stack });
        res.status(404).json({ message: 'Pemesanan tidak ditemukan' });
    }
}


//PUT
const updateDataOrder = async (req, res) => {
        try{
            //mendapatkan req params -> mendapatkan data movie berdasarkan id
            const { id } = req.params
            //mendapatkan req body
            const {bookId, name, address, date, qty, status} = req.body

            const order = await Order.findByPk(id)

            if (!order) {
                logger.error('Pemesanan tidak ditemukan untuk diperbarui');
                return res.status(404).json({
                    error: 'Pemesanan Tidak ditemukan'
                });
            }
            //update
            order.bookId = bookId || order.bookId;
            order.name = name || order.name;
            order.address = address || order.address
            order.date = date || order.date;
            order.qty = qty || order.qty;
            order.status = status || order.status;
    
            await order.save();
            logger.info('Pemesanan berhasil diperbarui', { id });
            return res.status(200).json({
                userId: order.userId,
                bookId: order.bookId,
                name: order.name,
                address: order.address,
                date: order.date,
                qty: order.qty,
                status: order.status,
                updatedAt: order.updatedAt,
            });
        } catch(error) {
            logger.error('Error dalam perbarui data pesanan', { stack: error.stack });
        }
    }
    

    //PATCH
    const updateOrder = async (req, res) => {
        try{
            //mendapatkan req params -> mendapatkan data movie berdasarkan id
            const { id } = req.params
            //mendapatkan req body
            const { qty } = req.body
            const order = await Order.findByPk(id)
            if (!order) {
                logger.error('Pemesanan tidak ditemukan untuk diperbarui', { id });
                return res.status(404).json({
                    error: 'Pemesanan tidak ditemukan'
                });
            }
            //update
            order.qty = qty || order.qty;
            order.updateAt = new Date()

            //save data
            order.save()
            logger.info('Pemesanan berhasil diperbarui', { id });
            //response
            res.status(200).json(order);
        } catch(error) {
            logger.error('Error dalam perbarui qty by ID', { stack: error.stack });
        }
    }

//DELETE
    const deleteOrder = async (req, res) => {
        try{
            const { id } = req.params 
            const order = await Order.findByPk(id)

            if (!order) {
                logger.error('Pemesanan tidak ditemukan untuk dihapus', { id });
                res.status(404).json({ message: 'Pemesanan tidak ditemukan' });
            }
            order.destroy()
            logger.info('Pemesanan berhasil dihapus', { id, date: order.date });
            res.status(200).json({ message: `Pembelian pada tanggal ${order.date} berhasil dihapus` });

        }catch(error){
            logger.error('Error dalam menghapus pemesanan', { stack: error.stack });
        }
    }

module.exports = {createOrder, getAllOrder, getOrderById, updateDataOrder, updateOrder, deleteOrder}