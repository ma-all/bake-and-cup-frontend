const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/menu-items`;

const index = async () => {
    const res = await fetch(BASE_URL)
    const data = await res.json()
    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }
    return data
}

export {
    index
}