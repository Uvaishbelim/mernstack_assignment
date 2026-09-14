const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


// CREATE
router.post("/", async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        next(error);
    }
});


// READ ALL
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        next(error);
    }
});


// CATEGORY REPORT
router.get("/reports/category", async (req, res, next) => {
    try {
        const report = await Product.aggregate([
            {
                $group: {
                    _id: "$category",

                    totalStock: {
                        $sum: "$stock"
                    },

                    totalValue: {
                        $sum: {
                            $multiply: ["$price", "$stock"]
                        }
                    }
                }
            },
            {
                $sort: {
                    totalValue: -1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            report
        });
    } catch (error) {
        next(error);
    }
});


// STOCK UPDATE
router.patch("/:id/stock", async (req, res, next) => {
    try {
        const { change } = req.body;

        if (typeof change !== "number") {
            return res.status(400).json({
                success: false,
                message: "change must be a number"
            });
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                stock: { $gte: -change }
            },
            {
                $inc: {
                    stock: change
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found or insufficient stock"
            });
        }

        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            product
        });
    } catch (error) {
        next(error);
    }
});


// READ ONE
router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
});


// UPDATE
router.put("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        next(error);
    }
});


// DELETE
router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;