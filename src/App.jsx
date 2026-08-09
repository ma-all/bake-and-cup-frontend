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

//for the cart
import Cart from "./pages/Cart"
import { create, update } from "./services/orderService"



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

  //create place order 
  const handlePlaceOrder = async(MenuItemService, totalPrice, totalCaffeine)=>{
    try {
      const orderData = {
        items: items.map((item)=> item._id),
        totalPrice,
        totalCaffeine
      }
      await create (orderData)
      setCartItems([])
      Navigate('/orders')
      
    } catch (error) {
      console.log('Failed to place order:', error)
      
    }
  }


  //update orders 
  const handleUpdateItem = async(itemId, updatedData)=>{
    try {
      const updateItem = await update(itemId, updatedData)
      setCartItems(
        cartItems.map((item)=>(item._id === itemId ? updateItem:item))
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
        <Route path='/menu-items' element={<Menu menuItems={menuItems} categories={categories} />} />
        <Route path='/menu-items/:menuItemId' element={<MenuDetails menuItems={menuItems} />}/>


        // cart 
        <Route path="/orders" element={<Cart cartItems={cartItems} user={user}/>}/>

    
      </Routes>
      </main>
    </div>
  )
}

export default App