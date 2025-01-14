import { useEffect, useState } from "react";
import "../assets/css/home.css";
import { getCartDetails, setCartDetails } from "../utils/common";

const Home = () => {
  const [PRODUCTS, setProducts] = useState([]);
  const[cart, setCart] = useState([]);


  useEffect(() => {

    getProductDetails();
    setCart(getCartDetails());
    return () => {
      // cleanup
    };
  }, []);

  const getProductDetails = async () => {
    let productUrl = "http://localhost:3000/products";
    const products = await fetch(productUrl);
    const productJson = await products.json();
    setProducts(productJson);
  };

  function addcart(index) {
    const product = PRODUCTS[index];
    const existingProduct = cart.find((item) => item.name === product.name);

    if (!existingProduct) {
      const productCopy = { ...product, quantity: 1 };
      setCart([...cart, productCopy]);
    } else {
      setCart(cart.map((item) => {
        if (existingProduct.name === item.name) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }));
    }
    setCartDetails(cart);
    console.log(cart);
  }

  function updateQuantity(index, change) {
    const product = PRODUCTS[index];
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      //update the quantity
      const newQuantity = existingProduct.quantity + change;
      if (newQuantity > 0) {
        setCart(cart.map((item) => {
          if (existingProduct.name === item.name) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        }));
      } else {
          setCart(cart.filter((item) => item.name !== product.name));
      }
    }
    setCartDetails(cart);
  }

  return (
    <>
      <div className="hero-section">
        <div className="heromsg">
          <p>
            You are on amazon.com. You can also shop on Amazon India for
            millions o products with fast local delivery.{" "}
            <a
              href="https://www.amazon.in/?ref=aisgw_intl_stripe_in"
              target="_blank"
            >
              Click here to go amazon.in
            </a>
          </p>
        </div>
      </div>
      <div className="shop-items" id="product-list">
        {PRODUCTS.map((product, productIndex) => {
          const existingProduct = cart.find(
            (item) => item.name === product.name
          );

          return (
            <div className="product" key={productIndex}>
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
                {existingProduct ? (
                  <div className="Addcart-action">
                    <button
                      className="cart-decrement"
                      type="button"
                      onClick={() => updateQuantity(productIndex, -1)}
                    >
                      -
                    </button>
                    <span>{existingProduct.quantity}</span>
                    <button
                      className="cart-increment"
                      type="button"
                      onClick={() => updateQuantity(productIndex, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="Addcart"
                    type="button"
                    onClick={() => addcart(productIndex)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
