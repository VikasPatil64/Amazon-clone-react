import { useEffect, useState } from "react";
import { getCartDetails, setCartDetails } from "../utils/common";
import "../assets/css/Cart.css";
import { Link } from "react-router";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCartDetails());
  }, []);

  // Function to update the quantity of a product
  function updateQuantity(index, change) {
    const product = cart[index];
    const newQuantity = product.quantity + change;

    if (newQuantity <= 0) {
      // Remove product from cart if quantity becomes zero or negative
      setCart(cart.filter((item) => item.name !== product.name));
    } else {
      // Update quantity
      setCart(cart.map((item) => {
          if (product.name === item.name) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        }));
    }

    setCartDetails(cart);
  }

  return (
    <>
        <div className="navbar">
          <div className="nav-cart">
            <Link to="/">Back to Shop</Link>
          </div>
        </div>

      <main>
        <div className="cart-items" id="cart-items">
          {cart.map((product, productIndex) => {
            return (
              <div className="cart-item" key={productIndex}>
                <div className="box-image">
                  <img
                    src={`/src/assets/images/${product.image}`}
                    alt="${product.name}"
                  />
                </div>
                <div className="box-content">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  <p>{product.description}</p>
                  {
                    <div className="Addcart-action">
                      <button
                        className="cart-decrement"
                        type="button"
                        onClick={() => updateQuantity(productIndex, -1)}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="cart-increment"
                        type="button"
                        onClick={() => updateQuantity(productIndex, 1)}
                      >
                        +
                      </button>
                    </div>
                  }
                </div>
              </div>
            );
          })}
          {cart.length === 0 && <p>Your cart is empty.</p>}
        </div>

        <div className="cart-total" id="cart-total">
          {/* <!-- Cart total will be calculated and displayed here --> */}
        </div>
      </main>
    </>
  );
};
export default Cart;
