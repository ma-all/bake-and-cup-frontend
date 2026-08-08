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
        <>
            <img src={menuItem.img} alt={menuItem.name} />
            <h3>{menuItem.name}</h3>
            <p>{menuItem.description}</p>
            <p>{menuItem.category}</p>
            <p>{menuItem.caffeine}</p>
            <p>{menuItem.price}</p>
        </>
    )
}

export default MenuDetails