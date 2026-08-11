import { useState, useEffect } from "react"
import { Link } from "react-router"
import * as orderService from '../services/orderService'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.index()
        setOrders(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleDelete = async (orderId) => {
    try {
      await orderService.deleteOrder(orderId)
      setOrders((prev) => prev.filter((order) => order._id !== orderId))
    } catch (error) {
      console.log('Error deleting order:', error)
    }
  }

  if (loading) return <p>Loading orders....</p>

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders placed yet.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order, index) => {

            const price = order.totalPrice ?? order.price ?? 0;

            const caffeine = order.totalCaffeine ?? order.caffeine ?? 0;

            return (
              <div key={order._id} className="order-card">
                <div className="order-header">

                  <h3>Order #{order.orderNumber || order.name || order._id || index + 1}</h3>

                </div>
                <div className="order-body">
                  <p><strong>Total Price:</strong> {Number(price).toFixed(2)} BHD</p>
                  <p><strong>Total Caffeine:</strong> {caffeine}</p>


                  {order.items && order.items.length > 0 && (


                    <p className="order-items">
                      <strong>Items:</strong>{' '}
                      {order.items.map((item) => item.name || 'Item').join(', ')}

                    </p>

                  )}
                </div>

                <div className="order-actions">
                  <Link to={`/orders/${order._id}`}>View Details</Link>
                  <button onClick={() => handleDelete(order._id)}>Delete Order</button>

                </div>
              </div>

            );
          })}

        </div>
      )};
    </div>
  )
}
export default Orders;