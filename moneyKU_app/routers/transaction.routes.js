const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transaction.controller');

// Route "addTransaction" (menambahkan data transaksi)
router.post('/transactions', authenticateUser, transactionController.addTransaction);

// Route "getAllTransactionsByUser" (mendapatkan semua data transaksi user tersebut)
router.get('/all', authenticateUser, transactionController.getAllTransactionsByUser);


// Route "updateTransactionById" (memperbarui data transaksi) berdasarkan ID
router.put('/update/:id', authenticateUser, transactionController.updateTransactionById);

// Route "deleteTransactionById" (menghapus data transaksi) berdasarkan ID
router.delete('/delete/:id', transactionController.deleteTransactionById);

module.exports = router;