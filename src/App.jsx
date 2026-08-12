import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Menu from "./pages/Menu"
import * as MenuItemService from './services/menuItems'
import MenuDetails from "./pages/MenuDetails"
import Cart from "./pages/Cart"
import * as ordersService from "./services/orderService"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import OrderDetails from './pages/OrderDetails'
import Error from './pages/Error'

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())

  const [menuItems, setMenuItems] = useState([])

  const categories = ['All', 'Coffee', 'Non-Coffee', 'Pastry']

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuItemsData = await MenuItemService.index()
        setMenuItems(menuItemsData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMenuItems()
  }, [])

  useEffect(() => {
    setCartItems([])
  }, [user])

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item])
  }


  const handlePlaceOrder = async (cartItems, totalPrice, totalCaffeine, paymentMethod) => {
    try {
      const itemIds = cartItems.map((item) => item._id || item.id);

      console.log("Cart items array being sent to backend:", itemIds);


      const orderData = {
        user: user._id,
        items: cartItems.map((item) => item._id),
        totalPrice,
        totalCaffeine,
        paymentMethod,
      }

      const orderCreated = await ordersService.create(orderData)
      setCartItems([])
      return orderCreated

    } catch (error) {
      console.log('Failed to place order:', error)
      return null
    }
  }




  //update orders 
  const handleUpdateItem = async (itemId, updatedData) => {
    try {
      const updateItem = await update(itemId, updatedData)
      setCartItems(
        cartItems.map((item) => (item._id === itemId ? updateItem : item))
      )

    } catch (error) {
      console.log('Faild to update item ', error)

    }
  }


  //delete 
  const handleDeleteItem = async (itemId) => {
    try {
      const cartItemIndex = cartItems.findIndex((item) => item._id === itemId)

      if (cartItemIndex !== -1) {
        const updatedCart = [...cartItems]
        updatedCart.splice(cartItemIndex, 1)
        setCartItems(updatedCart)
      }

    } catch (error) {
      console.log('Failed to remove item', error)
    }
  }


  return (
    <div>
      <Nav user={user} setUser={setUser} cartItems={cartItems} />
      <main className="app-main">
        <Routes>
          <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
          <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
          <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
          <Route path='/menu-items' element={<Menu menuItems={menuItems} categories={categories} cartItems={cartItems} handleAddToCart={handleAddToCart} handleDeleteItem={handleDeleteItem} />} />
          <Route path='/menu-items/:menuItemId' element={<MenuDetails menuItems={menuItems} user={user} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} handlePlaceOrder={handlePlaceOrder} handleAddToCart={handleAddToCart} handleDeleteItem={handleDeleteItem} user={user} />} />
          <Route path='checkout' element={<Checkout cartItems={cartItems} handlePlaceOrder={handlePlaceOrder} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </div>
  )
}

export default App