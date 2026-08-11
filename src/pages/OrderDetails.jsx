import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as orderService from '../services/orderService';

const OrderDetails = () => {
  const { orderId } = useParams();
  
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.show(orderId);
        
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="detail-container">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Total Price:</strong> {Number(order.totalPrice || 0).toFixed(2)} BHD</p>
      <p><strong>Total Caffeine:</strong> {order.totalCaffeine || 0}</p>

      <h3>Items:</h3>
      {order.items && order.items.length > 0 ? (
        order.items.map((item, index) => (
          <div key={item._id || index} className="order-item-card">
            {item.img && <img src={item.img} alt={item.name} className="menu-img" />}
            <p><strong>{item.name}</strong></p>
            {item.price && <p>Price: {item.price} BHD</p>}
          </div>
        ))
      ) : (
        <p>No items in this order.</p>
      )}

      <br />
      <Link to="/orders">← Back to Orders</Link>
    </div>
  );
};

export default OrderDetails;