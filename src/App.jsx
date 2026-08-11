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

// Orders components & service
import Orders from "./pages/Orders"
import OrderDetails from './pages/OrderDetails'
import * as orderService from './services/orderService'

// Cart component
import Cart from "./pages/Cart"



const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())

  const [menuItems, setMenuItems] = useState([])

  const categories = ['All', 'Coffee', 'Non-Coffee', 'Pastry']

  //for the cart 
const [cartItems, setCartItems]=useState([])

//for the shopping cart
// const [shoppingCart , setShoppingCart]=useState([])


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

  const handleAddToCart = (item)=>{
    setCartItems([...cartItems, item])
  }

  //create place order 
  const handlePlaceOrder = async( totalPrice, totalCaffeine, navigate)=>{
    try {
      const orderData = {
        items: cartItems,
        // items: cartItems.map((item) => item._id),
        // items: items.map((item)=> item._id),
        totalPrice,
        totalCaffeine,

      }
      // await ordersService.create(orderData)
      const newOrder = await orderService.create(orderData)
      setCartItems([])
      // Navigate('/order')
     
if (newOrder && newOrder._id) {
      navigate(`/orders/${newOrder._id}`)
    } else {
      navigate('/orders') // Fallback if no ID returned
    }

      //redirect user to orders list
      // navigate('/orders')
      
    } catch (error) {
      console.log('Failed to place order:', error)
    }
  }

  //update orders 
  const handleUpdateItem = async(itemId, updatedData)=>{
    try {
      const updateItem = await update(itemId, updatedData)
      setCartItems(
        cartItems.map((item)=>(item._id === itemId ? updateItem : item))
      )
      
    } catch (error) {
      console.log('Faild to update item ',error)
      
    }
  }


  //delete 
  const handleDeleteItem = async (itemId)=>{
    try {

      await deleteOrder(itemId)
      setCartItems(cartItems.filter((item)=> item._id !== itemId))
      
    } catch (error) {
      console.log('Faild to delet item', error)
      
    }
  }

  
  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
        <Route path='/menu-items' element={<Menu menuItems={menuItems} categories={categories} handleAddToCart={handleAddToCart} />} />
        <Route path='/menu-items/:menuItemId' element={<MenuDetails menuItems={menuItems} />}/>


        // cart 
        <Route path="/cart" element={<Cart cartItems={cartItems} handlePlaceOrder={handlePlaceOrder} user={user}/>}/>

        //orders
       <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        
    
      </Routes>
      </main>
    </div>
  )
}

export default App