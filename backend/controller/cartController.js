import User from "../model/userModel.js";


export const addToCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const addQty = quantity ? Number(quantity) : 1;
    const cartSize = size || "Default";

    if (!itemId || !Number.isFinite(addQty) || addQty <= 0) {
      return res.status(400).json({ message: "Invalid cart input" });
    }

    const userData = await User.findById(req.userId);

    // Check if user exists
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure cartData is initialized
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][cartSize]) {
        cartData[itemId][cartSize] += addQty;
      } else {
        cartData[itemId][cartSize] = addQty;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][cartSize] = addQty;
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "addToCart error" });
  }



}


export const UpdateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body
    const normalizedSize = size || "Default"
    const parsedQuantity = Number(quantity)

    if (!itemId || !Number.isFinite(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({ message: "Invalid cart update input" })
    }

    const userData = await User.findById(req.userId)
    if (!userData) {
      return res.status(404).json({ message: "User not found" })
    }

    const cartData = userData.cartData || {}

    if (!cartData[itemId]) {
      cartData[itemId] = {}
    }

    cartData[itemId][normalizedSize] = parsedQuantity

    await User.findByIdAndUpdate(req.userId, { cartData })

    return res.status(201).json({ message: "cart updated" })




  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "updateCart error" })
  }




}

export const getUserCart = async (req, res) => {

  try {

    const userData = await User.findById(req.userId)
    if (!userData) {
      return res.status(404).json({ message: "User not found" })
    }

    const cartData = userData.cartData || {};


    return res.status(200).json(cartData)




  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "getUserCart error" })
  }


}
