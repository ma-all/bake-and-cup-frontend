import { useParams } from "react-router"
import * as reviewService from '../services/reviews'
import { useEffect, useState } from "react"

const MenuDetails = (props) => {

    const { menuItemId } = useParams()

    const [review, setReview] = useState([])

    const [comment, setComment] = useState('')

    const [updateReviewId, setUpdateReviewId] = useState(null)

    const menuItem = props.menuItems.find((item) => {
        return item._id === menuItemId
    })

    useEffect(() => {
        if (menuItem && menuItem.reviews) {
            setReview(menuItem.reviews)
        }
    }, [menuItem])

    if (!menuItem) {
        return <h2>The menu item is not found.</h2>
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('indifr handle submit')

        if (updateReviewId) {
            const updatedReview = await reviewService.update(menuItemId, updateReviewId, { comment })
            if (updatedReview) {
                setReview(review.map((rev) => (
                    rev._id === updateReviewId ? { ...rev, comment } : rev
                )))
                setUpdateReviewId(null)
            }
        } else {
            const newReview = await reviewService.create(menuItemId, { comment })
            if (newReview) {
                setReview([...review, newReview])
            }
        }
        setComment('')
    }
    const handleUpdateReview = (rev) => {
        setUpdateReviewId(rev._id)
        setComment(rev.comment)
    }

    const handleDeleteReview = async (reviewId) => {
        await reviewService.deleteReview(menuItemId, reviewId)
        setReview(review.filter((rev) => rev._id !== reviewId))
    }

    return (
        <>
            <div className="detail-container">
                <img src={menuItem.img} alt={menuItem.name} className="img-detail" />
                <div className="details">
                    <h3>{menuItem.name}</h3>
                    <p>{menuItem.description}</p>
                    {menuItem.category === 'Coffee' && (
                        <p>Caffeine: {menuItem.caffeine} mg</p>
                    )}
                    <p>Price: {menuItem.price}</p>
                </div>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <h2>{updateReviewId ? 'Edit Review' : 'Add A Review'}</h2>

                    <textarea name='addReview' value={comment} required onChange={(event) => setComment(event.target.value)} />
                    <button type='submit'>
                        {updateReviewId ? 'Update Review' : 'Add Review'}
                    </button>
                </form>
            </div>

            <div>
                <h3>Reviews</h3>

                {review.length === 0 ? (
                    <p>No reviews</p>
                ) : (
                    review.map((rev) => {
                        const reviwerId = typeof rev.reviwer === 'object' ? rev.reviwer?._id : rev.reviwer

                        const isReviwer = props.user && props.user._id === reviwerId

                        return (
                            <div key={rev._id}>
                                <p>{rev.comment}</p>
                                {isReviwer && (
                                    <>
                                        <button onClick={() => handleUpdateReview(rev)}> Edit </button>
                                        <button onClick={() => handleDeleteReview(rev._id)}> Delete </button>
                                    </>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
        </>
    )
}



export default MenuDetails