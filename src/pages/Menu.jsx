import { useState } from "react"
import { Link } from "react-router"

const Menu = (props) => {

    const [categorySelected, setCategorySelected] = useState('All')

    const categoryFiltered = categorySelected === 'All' ? props.menuItems : props.menuItems.filter((item) => item.category === categorySelected)

    return (
        <>
            <div className="menu-filter">
                {props.categories.map((category) =>
                <>
                    <button key={category}
                        onClick={() => setCategorySelected(category)} className="filter-btn">
                        {category}
                    </button>
                    <br/>
                </>
                )}
            </div>

            <div className="menu-container">
                {categoryFiltered.map((item) => (
                    <div key={item._id} className="menu-card">
                        <div className="img-container">
                            <img src={item.img} alt={item.name} className="menu-img" />
                        </div>
                        <h2>{item.name}</h2>
                        <h3>Price: {item.price} BHD</h3>
                        <button>
                            <Link to={`/menu-items/${item._id}`}> View Details </Link>
                        </button>
                        <button>Add To Cart</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Menu