const { Transaction, Order } = require('../models/index.js')
const  logger = require('../logger.js');

//POST
const createTransaction = async (req, res) => {
    try {
        const { orderId, total, payment, date} = req.body
        const newTransaction = await Transaction.create({
            orderId,
            total ,
            payment,
            date
            
        });

        logger.info('Transaksi berhasil dibuat', {
            transactionID: newTransaction.id
        });
      
          // Ambil data pesanan dengan buku yang telah dimuat
          const order = await newTransaction.reload(
             {
                include:[
                    {
                        model: Order,
                        as: 'order'
                    }
                ]
          });

        res.status(200).json(order);
    }catch(error){
        logger.error('Error Membuat Transaksi', { stack: error.stack });
        res.status(500).json({error:  '<-- Error Membuat Transaksi'})
       } 
    }

//GET DATA
const getAllTransaction = async(req, res) => {
   try{
const transaksi = await Transaction.findAll({
    include:[
        {
            model: Order,
            as: 'order'
        }
    ]
   })
res.status(200).json({ transaksi });
    
   }catch (error){
    logger.error('Error dalam mendapatkan data transaksi', { stack: error.stack });
    res.status(404).json({ message: 'Transaksi tidak ditemukan' });
   }
    }

//GET BY ID
const getTransaksiById = async(req, res) => {
    try{
        const { id } = req.params;
        const transaksi = await Transaction.findByPk(id, {
           include: [
            {
                model: Order,
                as: 'order'
            }
           ]
        });
        
        if (transaksi === null){
            logger.error('Transaksi tidak ditemukan', { id });
            return res.status(404).json({ 
                error :'Transaksi tidak ditemukan'
            });
        }

        res.status(200).json(transaksi);
    } catch (error) {
        logger.error('Error dalam mendapatkan data transaksi dengan Id', { stack: error.stack });
        res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }
}


//PUT
const updateDataTransaksi = async (req, res) => {
        try{
            //mendapatkan req params -> mendapatkan data movie berdasarkan id
            const { id } = req.params
            //mendapatkan req body
            const { orderId, total, payment, date} = req.body

            const transaksi = await Transaction.findByPk(id)

            if (!transaksi) {
                logger.error('Transaksi tidak ditemukan untuk diperbarui', { id });
                return res.status(404).json({
                    error: 'Transaksi Tidak ditemukan'
                });
            }
            //update
            transaksi.orderId = orderId || transaksi.orderId;
            transaksi.total = total || transaksi.total;
            transaksi.payment = payment || transaksi.payment;
            transaksi.date = date || transaksi.date;
    
            await transaksi.save();
            logger.info('Transaksi berhasil diperbarui', { id });
            return res.status(200).json({
                orderId: transaksi.orderId,
                total: transaksi.total,
                payment: transaksi.payment,
                date: transaksi.date,
                updatedAt: transaksi.updatedAt,
            });
        } catch(error) {
            logger.error('Error dalam perbarui data transaksi', { stack: error.stack });
        }
    }

//DELETE
    const deleteTransaction = async (req, res) => {
        try{
            const { id } = req.params 
            const transaksi = await Transaction.findByPk(id)

            if (!transaksi) {
                logger.error('Transaksi tidak ditemukan untuk dihapus', { id });
                res.status(404).json({ message: 'Transaksi tidak ditemukan' });
            }
            transaksi.destroy()
            logger.info('transaksi berhasil dihapus', { id, date: transaksi.date });
            res.status(200).json({ message: `Transaksi pada tanggal ${transaksi.date} berhasil dihapus` });

        }catch(error){
            logger.error('Error dalam menghapus taransksi', { stack: error.stack });
        }
    }

module.exports = {createTransaction, getAllTransaction, getTransaksiById, updateDataTransaksi, deleteTransaction}