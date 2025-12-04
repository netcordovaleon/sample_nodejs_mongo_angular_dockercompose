const Product = require('../models/product');


exports.getAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.create = async (req, res) => {
try {
const { name, description, price, stock } = req.body;
const newProduct = new Product({ name, description, price, stock });
const saved = await newProduct.save();
res.status(201).json(saved);
} catch (err) {
res.status(400).json({ message: err.message });
}
};


exports.update = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
            const updated = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};