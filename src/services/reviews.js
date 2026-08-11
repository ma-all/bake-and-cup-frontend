const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/menu-items`;

const create = async (menuItemId, reviewFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${menuItemId}/reviews`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewFormData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const update = async (menuItemId, reviewId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/${menuItemId}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const deleteReview = async (menuItemId, reviewId) => {
    try {
        const res = await fetch(`${BASE_URL}/${menuItemId}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export {
    create, update, deleteReview,
}