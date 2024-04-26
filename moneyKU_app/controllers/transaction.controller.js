//transaction.controllers 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Fungsi untuk menambahkan Transaksi berdasarkan token yang diberikan yang mengandung id dari User
async function addTransaction(req, res) {
    try {
      const { Name, Status, Category, Amount, Date } = req.body; 
      const userId = req.user.id; // Menarik ID pengguna dengan benar

      const transaction = await prisma.transaction.create({
        data: {
          UserId: userId, // Menetapkan userId langsung
          Name,
          Status,
          Category,
          Amount,
          Date
        }
      });
  
      // Mengembalikan respons sukses jika transaksi berhasil ditambahkan
      res.status(201).json({ message: 'Transaction added successfully ;)', transaction });
    } catch (error) {
      // Mengembalikan respons gagal jika terjadi kesalahan
      console.error('Error adding transaction:', error.message);
      res.status(500).json({ error: 'Failed to add transaction', message: error.message });
    }
  }

  //Funsi untuk GET semua data transaksi user berdasarkan token dari login yang berisi id User
  async function getAllTransactionsByUser(req, res) {
    try {
        const userId = req.user.id; // Assuming you have user information attached to the request
        const transactions = await prisma.transaction.findMany({ where: { UserId: userId } });
        res.status(200).json({ transactions });

    } catch (error) {
        next(error); // Continue to error handling middleware
    }
}

//Funsi UPDATE transaksi berdasarkan id transaksi dari user tersebut
async function updateTransactionById(req, res, next) {
    try {
        const { id } = req.params;
        const { Name, Status, Category, Amount, Date } = req.body;
        const updatedTransaction = await prisma.transaction.update({
            where: { id: parseInt(id) },
            data: { Name, Status, Category, Amount, Date }
        });
        res.status(200).json({ message: 'Transaction updated successfully', data: updatedTransaction });
    } catch (error) {
        next(error); 
    }
}

// Fungsi DELETE transaksi berdasarkan id transaksi dari user tersebut
async function deleteTransactionById(req, res, next) {
    try {
        const { id } = req.params;
        await prisma.transaction.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        next(error); // Lanjutkan ke middleware error handler
    }
}

module.exports = { 
    addTransaction,
    getAllTransactionsByUser,
    updateTransactionById,
    deleteTransactionById
};


