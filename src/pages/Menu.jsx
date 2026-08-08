import { Link } from "react-router"

const Menu = (props) => {
    return (
        <div className="menu-container">
            {props.menuItems.map((item) => (
                <div key={item._id} className="menu-card">
                    <img src={item.img} alt={item.name} className="menu-img" />
                    <h2>
                        <Link to={`/menu-items/${item._id}`}>
                            {item.name}
                        </Link>
                        <p>{item.price}</p>
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default Menu