const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/menu-items`;

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
    console.log('Error fetching menu item', error)

}}

export {
    index
}