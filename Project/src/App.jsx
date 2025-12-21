import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Component/Navbar'
import Home from './component/Home'
import Products from './component/Product'
import Cart from './component/Cart'
import DashBoard from './component/DashBoard'
import Profile from './component/Profile'
import Setting from './component/Setting'
import ProductProvider from './component/ProductProvider'

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<DashBoard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  )
}

export default App
