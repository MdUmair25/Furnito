import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req, res) => {
    try {
        const { name, title, description, originalPrice, sellingPrice, discount, rating, ratingCount, category, bestseller } = req.body

        if (!name || !title || !description || !category) {
            return res.status(400).json({ message: "Missing required product fields" })
        }

        const originalPriceNumber = Number(originalPrice)
        const sellingPriceNumber = Number(sellingPrice)
        const discountNumber = Number(discount)

        if (!Number.isFinite(originalPriceNumber) || !Number.isFinite(sellingPriceNumber) || originalPriceNumber <= 0 || sellingPriceNumber <= 0) {
            return res.status(400).json({ message: "Invalid product price" })
        }

        if (!req.files?.image1?.[0]?.path) {
            return res.status(400).json({ message: "image1 is required" })
        }

        const image1 = await uploadOnCloudinary(req.files.image1[0].path)
        const image2 = req.files?.image2?.[0]?.path ? await uploadOnCloudinary(req.files.image2[0].path) : image1
        const image3 = req.files?.image3?.[0]?.path ? await uploadOnCloudinary(req.files.image3[0].path) : image1
        const image4 = req.files?.image4?.[0]?.path ? await uploadOnCloudinary(req.files.image4[0].path) : image1

        const productData = {
            name,
            title,
            description,
            originalPrice: originalPriceNumber,
            sellingPrice: sellingPriceNumber,
            price: sellingPriceNumber, // mapping sellingPrice to price for compatibility
            discount: Number.isFinite(discountNumber) ? discountNumber : 0,
            rating: Number(rating) || 0,
            ratingCount: Number(ratingCount) || 0,
            category,
            subCategory: "", // Defaults to empty string as per request to remove subtype
            sizes: [],       // Defaults to empty array as per request to remove sizes
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
            image1,
            image2,
            image3,
            image4

        }

        const product = await Product.create(productData)

        return res.status(201).json(product)

    } catch (error) {
        return res.status(500).json({ message: "AddProduct error" })
    }

}


export const listProduct = async (req, res) => {

    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({ message: "ListProduct error" })
    }
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: "RemoveProduct error" })
    }

}
