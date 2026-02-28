import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    image4: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        default: ""
    },
    sizes: {
        type: Array,
        default: []
    },
    date: {
        type: Number,
        required: true
    },
    bestseller: {
        type: Boolean
    }

}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product