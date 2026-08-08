import { useParams } from "react-router"

const MenuDetails = (props) => {

    const { menuItemId } = useParams()

    const menuItem = props.menuItems.find((item) => {
        return item._id === menuItemId
    })

    if (!menuItem) {
        return <h2>The menu item is not found.</h2>
    }

    return (
        <div className="detail-container">
            <img src={menuItem.img} alt={menuItem.name} className="img-detail" />
            <div className="details">
                <h3>{menuItem.name}</h3>
                <p>{menuItem.description}</p>
                {/* <p>{menuItem.category}</p> */}
                {/* i need to make this an if statement so this only shows up if the menu item is coffee */}
                {/* <p>{menuItem.caffeine}</p> */}
                <p>Price: {menuItem.price}</p>
            </div>
        </div>
    )
}

export default MenuDetails