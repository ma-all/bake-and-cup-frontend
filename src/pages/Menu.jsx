import { useState } from "react"
import { Link, useNavigate } from "react-router"

const Menu = (props) => {

    const [categorySelected, setCategorySelected] = useState('All')

    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const categoryFiltered = categorySelected === 'All' ? props.menuItems : props.menuItems.filter((item) => item.category === categorySelected)

    const searchedItem = categoryFiltered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()))

    const itemQuantity = (itemId) => {
        return props.cartItems ? props.cartItems.filter((item) =>
            item._id === itemId).length : 0
    }

    return (
        <>
            <div className="search-menu">
                <label>Search</label>
                <input type='text' value={search} onChange={(event) => setSearch(event.target.value)} className="search-input" />
            </div>
            <br />
            <div className="menu-filter">
                {props.categories.map((category) =>
                    <>
                        <button key={category}
                            onClick={() => setCategorySelected(category)} className="filter-btn">
                            {category}
                        </button>
                        <br />
                    </>
                )}
            </div>
            <br />

            {searchedItem.length === 0 ? (
                <p>No items found</p>
            ) : (

                <div className="menu-container">
                    {searchedItem.map((item) => (
                        <div key={item._id} className="menu-card">
                            <div className="img-container">
                                <img src={item.img} alt={item.name} className="menu-img" />
                            </div>
                            <h2>{item.name}</h2>
                            <h3>Price: {item.price} BHD</h3>
                            <button>
                                <Link to={`/menu-items/${item._id}`}> View Details </Link>
                            </button>
                            {itemQuantity(item._id) === 0 ? (
                                <button onClick={() => props.handleAddToCart(item)}>Add To Cart</button>
                            ) : (
                                <div className="quantity-menu">
                                    <button onClick={() => props.handleDeleteItem(item._id)}> - </button>
                                    <p>{itemQuantity(item._id)}</p>
                                    <button onClick={() => props.handleAddToCart(item)}> + </button>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Menu