const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

const request = async (url, option) =>{
    const respone = await fetch(url, option);
    if(!respone.ok){
        const message = await respone.text();
        throw new Error(message || "เก็ดข้อผิดพลาดในการเชื่อมต่อ")
    }
    return respone.json();
};

const getProducts = () => request(API_URL);

// const getProduct = (id) => request(API_URL + "/" + id);
const getProduct = (id) => request(`${API_URL}/${id}`);

const createProduct = (product) => request(API_URL, {
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(product),
});

const updateProduct = (id , product) => request(`${API_URL}/${id}`, {
    method:"PUT",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(product),
});

const deleteProduct = (id) => request(`${API_URL}/${id}`, {
    method:"DELETE",
});

export { getProducts, getProduct , createProduct, updateProduct, deleteProduct};