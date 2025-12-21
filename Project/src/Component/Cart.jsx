import { useContext } from 'react'
import { ProductContext } from './ProductProvider'

import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(ProductContext)
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <h4>Your cart is empty 🛒</h4>
      </div>
    )
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>← Go Back</button>
      <h2>My Cart</h2>
      {cart.map(item => (
        <div className="card mb-3 p-3" key={item.id}>
          <div className="row align-items-center">
            <div className="col-md-2">
              <img src={item.image} alt={item.title} className="img-fluid" style={{ height: '80px', objectFit: 'contain' }} />
            </div>
            <div className="col-md-4">
              <h6>{item.title}</h6>
              <p className="mb-1">₹ {item.price}</p>
              <small className="text-muted">Item Total: ₹ {item.price * item.quantity}</small>
            </div>
            <div className="col-md-3 d-flex align-items-center gap-2">
              <button className="btn btn-sm btn-secondary" onClick={() => decreaseQty(item.id)} disabled={item.quantity === 1}>−</button>
              <span>{item.quantity}</span>
              <button className="btn btn-sm btn-secondary" onClick={() => increaseQty(item.id)}>+</button>
            </div>
            <div className="col-md-3 text-end">
              <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
      <div className="card p-3 mt-3 text-end">
        <h4>Total: ₹ {totalPrice.toFixed(2)}</h4>
        <button className="btn btn-success mt-2">Checkout</button>
      </div>
    </div>
  )
}
