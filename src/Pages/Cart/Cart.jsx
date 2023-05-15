import React from "react";
import "./Cart.css";
import amazonBanner from "../../assets/img/amazonBanner2.jpg";
import { useContext, useState, useEffect } from "react";
import { ShopContextCart } from "./../../context/ShopContext";
import { FaTrash } from "react-icons/fa";

function Cart() {
  const { cart, handleRemoveItem, setCart } = useContext(ShopContextCart);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(1);

  const handlePrice = () => {
    let initial = 0;
    cart.forEach((item) => {
      initial += amount * item.price;
    });
    setPrice(initial);
  };

  useEffect(() => {
    handlePrice();
  }, [cart, amount]);

  const handleChange = (item, num) => {
    let initial = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) {
        initial = index;
      }
    });
    setAmount((prevAmount) => {
      const newAmount = prevAmount + num;
      return newAmount > 0 ? newAmount : prevAmount;
    });
  };

  return (
    <>
      <section>
        <div className="cart-img">
          <img src={amazonBanner} alt="" />
        </div>
        {cart.length <= 0 && <p className="empty">Your cart is Empty</p>}

        {cart.length > 0 &&
          cart.map((item) => (
            <div className="cart-box" key={item.id}>
              <div className="product-img">
                <img src={item.image} alt="" />
                <p>{item.title}</p>
              </div>
              <div>
                <button onClick={() => handleChange(item, 1)}>+</button>
                <button>{amount}</button>
                <button onClick={() => handleChange(item, -1)}>-</button>
              </div>
              <div>
                <span>${item.price}</span>
                <button onClick={() => handleRemoveItem(item.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

        {cart.length > 0 && (
          <div className="total">
            <span>Total Price</span>
            <span>${price}</span>
            <div>
              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Cart;

