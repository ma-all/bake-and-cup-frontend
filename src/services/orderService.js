const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`;

const index = async () => {
    try{
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
} catch(error){
    console.log('Error fetching orders:', error)

}
}


const show = async (orderId) => {
    try{
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
} catch(error){
    console.log('Error fetching orders:', error)

}}



const create = async (formData) => {
    try{
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
} catch(error){
    console.log('Error fetching orders:', error)

}}


const update = async (orderId, formData) => {
    try{
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


}catch(error){
    console.log('Error fetching orders:', error)

}}

const deleteOrder = async (orderId) => {
    try{
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

}catch(error){
    console.log('Error fetching orders:', error)

}}

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