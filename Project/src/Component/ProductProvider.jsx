import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const addToCart = (product, qty) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id)
      if (exists) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        )
      } else {
        return [...prevCart, { ...product, quantity: qty }]
      }
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    )
  }

  const decreaseQty = (id) => {
    setCart(prev =>
      prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
    )
  }

  return (
    <ProductContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      cartCount: cart.length,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  )
}
