 export const getCartDetails = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    return cart
}

 export const setCartDetails = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

