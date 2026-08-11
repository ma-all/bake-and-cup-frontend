const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`;

const index = async () => {
    const res = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    
    const data = await res.json()

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }

    return data
}

const show = async (orderId) => {
    const res = await fetch(`${BASE_URL}/${orderId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    const data = await res.json()

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)

    }
    return data
}



const create = async (formData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(formData)
    })

    const data = await res.json()
    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message || data.error || 'Server Error'}`);
        
    }

    return data
}

const update = async (orderId, formData) => {
    const res = await fetch(`${BASE_URL}/${orderId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
        },

        body: JSON.stringify(formData),
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }

    return data


}

const deleteOrder = async (orderId) => {
    const res = await fetch(`${BASE_URL}/${orderId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }

    return data

}

const createPayment = async (payAmount) => {
    const res = await fetch(`${BASE_URL}/create-payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ payAmount })
    })
    const data = await res.json()

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }
    return data
}

export {
    index,
    show,
    update,
    create,
    deleteOrder,
    createPayment
}