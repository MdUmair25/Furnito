import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'

export const shopDataContext = createContext()

function ShopContext({ children }) {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItem, setCartItem] = useState({})
  const [loading, setLoading] = useState(false)
  const { userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const currency = 'INR'
  const delivery_fee = 200

  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setProducts(result.data)
    } catch (error) {
      // no-op
    }
  }

  const addtoCart = async (itemId, size, quantity = 1) => {
    const cartSize = size || "Default"
    const cartData = structuredClone(cartItem)

    if (cartData[itemId]) {
      if (cartData[itemId][cartSize]) {
        cartData[itemId][cartSize] += quantity
      } else {
        cartData[itemId][cartSize] = quantity
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][cartSize] = quantity
    }

    setCartItem(cartData)

    if (userData) {
      setLoading(true)
      try {
        await axios.post(serverUrl + "/api/cart/add", { itemId, size: cartSize, quantity }, { withCredentials: true })
        toast.success("Product Added to Cart")
      } catch (error) {
        toast.error("Failed to add to cart")
      } finally {
        setLoading(false)
      }
    }
  }

  const getUserCart = async () => {
    if (!userData) {
      setCartItem({})
      return
    }

    try {
      const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })
      setCartItem(result.data)
    } catch (error) {
      setCartItem({})
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem)
    if (!cartData[itemId]) {
      cartData[itemId] = {}
    }
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
      } catch (error) {
        // no-op
      }
    }
  }

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item]
          }
        } catch (error) {
          // no-op
        }
      }
    }
    return totalCount
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItem) {
      const itemInfo = products.find((product) => product._id === items)
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0 && itemInfo) {
            totalAmount += (itemInfo.sellingPrice || itemInfo.price) * cartItem[items][item]
          }
        } catch (error) {
          // no-op
        }
      }
    }
    return totalAmount
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getUserCart()
  }, [userData])

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
    loading
  }

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
