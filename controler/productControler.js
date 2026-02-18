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

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' })
        }
        const deletedProduct = await products.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' })
        }
        const { name, description, price, category, brand, stock } = req.body
        const updatedProduct = await products.findByIdAndUpdate(
            id, { name, description, price, category, brand, stock }, { new: true }
        )
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.searchProducts = async (req, res) => {
    try {
        let {query}= req.query
        const searchResults = await products.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { brand: { $regex: query, $options: 'i' } }
            ]
        })
        res.status(200).json({ products: searchResults })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }   
}

exports.filterProducts = async (req, res) => {
    try {
        const { category, brand, minPrice, maxPrice } = req.query
        const filterCriteria = {}
        if (category) filterCriteria.category = category
        if (brand) filterCriteria.brand = brand
        if (minPrice || maxPrice) {
            filterCriteria.price = {}
            if (minPrice) filterCriteria.price.$gte = parseFloat(minPrice)
            if (maxPrice) filterCriteria.price.$lte = parseFloat(maxPrice)
        }   
        const filteredProducts = await products.find(filterCriteria)
        res.status(200).json({ products: filteredProducts })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }  
}

