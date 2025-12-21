import { useContext } from 'react'
import { ProductContext } from './ProductProvider'

import ProductCard from './ProductCard'
import Skeleton from './Skeleton'

export default function Home() {
  const { products, loading } = useContext(ProductContext)

  return (
    <div className="container mt-4">
      <div className="row">
        {(loading ? Array(6).fill(0) : products).map((item, i) => (
          <div className="col-md-4 mb-3" key={i}>
            {loading ? <Skeleton /> : <ProductCard product={item} />}
          </div>
        ))}
      </div>
    </div>
  )
}
