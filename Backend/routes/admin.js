const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/products', adminController.getProducts)

router.post('/addProduct', adminController.postAddProduct);

router.put('/editProduct', adminController.editProduct);

router.delete('/deleteProduct/:prodId', adminController.deleteProduct);

module.exports = router;
