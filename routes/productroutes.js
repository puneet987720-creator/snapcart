const express = require("express")
const router = express.Router()
const productController = require('../controler/productControler')

router.post('/add', productController.addProduct)
router.get('/all', productController.getProducts)
router.get('/details/:id', productController.getProductById)

module.exports = router