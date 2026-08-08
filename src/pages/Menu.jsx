import { Link } from "react-router"

const Menu = (props) => {
    return (
        <>
            {props.menuItems.map((item) => (
                <div key={item._id}>
                    <h4>
                        <Link to={`/menu-items/${item._id}`}>
                            {item.name}
                        </Link>
                        <p>{item.price}</p>
                    </h4>
                </div>
            ))}
        </>
    )
}

export default Menu