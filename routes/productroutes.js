const express = require("express")
const router = express.Router()
const productController = require('../controler/productControler')

router.post('/add', productController.addProduct)
router.get('/all', productController.getProducts)
router.get('/details/:id', productController.getProductById)
router.delete('/delete-product/:id', productController.deleteProduct)
router.put('/update-product/:id', productController.updateProduct)
router.get('/search', productController.searchProducts)
router.get('/filter', productController.filterProducts)


module.exports = router