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
        console.log('see if data is loading', data)
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>
  if (!order) return <p>Order not found.</p>

  return (
    <div className="detail-container-order">
      <div className="order-header">
        <h2 className="order-titel">Order Details</h2>
        <p className="summary-item">
          <strong>Order ID:</strong> {order._id}
        </p>
        <p className="summary-item">
          <strong>Total Price:</strong> {Number(order.totalPrice || 0).toFixed(2)} BHD
        </p>
        <p className="summary-item">
          <strong>Total Caffeine:</strong> {order.totalCaffeine || 0}
        </p>
      </div>

      <div className="order-items-section">
        <h3>Items:</h3>
        {order.items && order.items.length > 0 ? (
          <div className="items-list">
            {order.items.map((item, index) => (
              <div key={item._id || index} className="order-item-card">
                <div className="item-info">
                  <strong>{item.name || item} - {item.price} BHD</strong>
                </div>
              </div>
            ))}
          </div>
        ) : (

          <p className="emty-message">No items in this order.</p>
        )}
      </div>
      

      <br />
      <div className="order-footer">
        <Link to="/orders"> ← Back to Orders</Link>
      </div>
    </div>
  
  );
  
};

export default OrderDetails