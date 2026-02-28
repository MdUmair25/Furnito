import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModel.js";
import razorpay from 'razorpay'
import crypto from "crypto"
import dotenv from 'dotenv'
dotenv.config()
const currency = 'inr'
const VALID_STATUSES = new Set(["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"])

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const calculateOrderAmount = async (items = []) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Order items are required")
    }

    const productIds = items.map((item) => item?._id || item?.productId).filter(Boolean)
    if (productIds.length !== items.length) {
        throw new Error("Invalid order item id")
    }

    const products = await Product.find({ _id: { $in: productIds } }).select("_id sellingPrice price")
    const priceMap = new Map(products.map((p) => [String(p._id), Number(p.sellingPrice || p.price || 0)]))

    let amount = 0
    for (const item of items) {
        const productId = String(item._id || item.productId)
        const quantity = Number(item.quantity)
        const unitPrice = priceMap.get(productId)

        if (!Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitPrice) || unitPrice <= 0) {
            throw new Error("Invalid order item")
        }
        amount += unitPrice * quantity
    }

    const deliveryFee = amount > 0 ? 200 : 0
    return amount + deliveryFee
}

// for User
export const placeOrder = async (req,res) => {

     try {
         const { items, address } = req.body;
         const userId = req.userId;
         if (!address || typeof address !== "object") {
            return res.status(400).json({ message: "Invalid address" })
         }

         const amount = await calculateOrderAmount(items)
         const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
         }

         const newOrder = new Order(orderData)
         await newOrder.save()

         await User.findByIdAndUpdate(userId,{cartData:{}})

         return res.status(201).json({message:'Order Place'})
    } catch (error) {
        return res.status(500).json({message: error.message || 'Order Place error'})
    }
    
}


export const placeOrderRazorpay = async (req,res) => {
    try {
        
         const { items, address } = req.body;
         const userId = req.userId;
         if (!address || typeof address !== "object") {
            return res.status(400).json({ message: "Invalid address" })
         }

         const amount = await calculateOrderAmount(items)

         const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date: Date.now()
         }

         const newOrder = new Order(orderData)
         await newOrder.save()

         const options = {
            amount:amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
         }
         await razorpayInstance.orders.create(options, (error,order)=>{
            if(error) {
                return res.status(500).json(error)
            }
            res.status(200).json(order)
         })
    } catch (error) {
        return res.status(500).json({ message: error.message || "Razorpay order error" })
    }
}


export const verifyRazorpay = async (req,res) =>{
    try {
        const userId = req.userId
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment payload" })
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" })
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        const appOrder = await Order.findById(orderInfo.receipt)

        if (!appOrder || String(appOrder.userId) !== String(userId)) {
            return res.status(403).json({ message: "Order not found for user" })
        }

        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt,{ payment: true });
            await User.findByIdAndUpdate(userId , {cartData:{}})
            return res.status(200).json({ message:'Payment Successful' })
        }
        return res.status(400).json({ message:'Payment Failed' })
    } catch (error) {
        return res.status(500).json({ message: error.message || "Payment verification failed" })
    }
}






export const userOrders = async (req,res) => {
      try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({message:"userOrders error"})
    }
    
}




//for Admin



    
export const allOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({message:"adminAllOrders error"})
        
    }
    
}
    
export const updateStatus = async (req,res) => {
    
try {
    const {orderId , status} = req.body
    if (!orderId || !VALID_STATUSES.has(status)) {
        return res.status(400).json({ message: "Invalid order status update" })
    }

    await Order.findByIdAndUpdate(orderId , { status })
    return res.status(201).json({message:'Status Updated'})
} catch (error) {
     return res.status(500).json({ message: error.message })
}
}
