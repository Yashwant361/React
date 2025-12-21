import { useContext, useState } from 'react'
import { ProductContext } from './ProductProvider'


export default function ProductCard({ product }) {
  const [qty, setQty] = useState(1)
  const { addToCart } = useContext(ProductContext)

  return (
    <div className="card p-3 h-100">
      <img
        src={product.image}
        className="card-img-top"
        style={{ height: 200, objectFit: 'contain' }}
        alt={product.title}
      />
      <div className="card-body">
        <h6>{product.title}</h6>
        <p>₹ {product.price}</p>

        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-sm btn-secondary" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
          <span>{qty}</span>
          <button className="btn btn-sm btn-secondary" onClick={() => setQty(q => q + 1)}>+</button>
        </div>

        <button className="btn btn-primary mt-2 w-100" onClick={() => addToCart(product, qty)}>Add to Cart</button>
        <button className="btn btn-outline-success mt-2 w-100">Buy Now</button>
      </div>
    </div>
  )
}
