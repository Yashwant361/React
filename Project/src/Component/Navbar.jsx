import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ProductContext } from './ProductProvider'


export default function Navbar() {
  const { cartCount } = useContext(ProductContext)

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">MyStore</Link>
      <div className="ms-auto d-flex gap-3">
        <Link className="nav-link text-white" to="/">Home</Link>
        <Link className="nav-link text-white" to="/products">Products</Link>
        <Link className="nav-link text-white" to="/cart">
          Cart <span className="badge bg-danger">{cartCount}</span>
        </Link>
        <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  )
}
