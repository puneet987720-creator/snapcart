const mongoose = require('mongoose')
const products = require('../models/products')
const fs = require('fs')

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, brand, stock } = req.body
        const newProduct = new products({
            name,
            description,
            price,
            category,
            brand,
            stock
        })
        await newProduct.save()
        res.status(201).json({ message: 'Product added successfully', product: newProduct })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const allProducts = await products.find()
        res.status(200).json({ products: allProducts })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' })
        }
        const product = await products.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}