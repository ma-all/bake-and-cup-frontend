import { Link } from "react-router"

const Menu = (props) => {
    return (
        <div className="menu-container">
            {props.menuItems.map((item) => (
                <div key={item._id} className="menu-card">
                    <div className="img-container">
                        <img src={item.img} alt={item.name} className="menu-img" />
                    </div>
                    <Link to={`/menu-items/${item._id}`}>
                        <h2>{item.name}</h2>
                    </Link>
                    <h3>Price: {item.price} BHD</h3>
                    <button>View Details</button>
                    <button>Add To Cart</button>
                </div>
            ))}
        </div>
    )
}

export default Menu