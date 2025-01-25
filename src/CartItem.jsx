import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping, updateCartIcon }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calcul du montant total de tous les produits dans le panier
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.cost.slice(1)) * item.quantity, 0)
      .toFixed(2);
  };

  // Calcul du nombre total d'articles dans le panier
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Fonction pour continuer les achats
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); 
  };

  // Fonction pour augmenter la quantité d'un article
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    updateCartIcon(calculateTotalQuantity() + 1); // Met à jour l'icône du panier
  };

  // Fonction pour diminuer la quantité d'un article
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      updateCartIcon(calculateTotalQuantity() - 1); // Met à jour l'icône du panier
    }
  };

  // Fonction pour supprimer un article du panier
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    updateCartIcon(calculateTotalQuantity() - item.quantity); // Met à jour l'icône du panier
  };

  // Calcul du coût total pour un article en fonction de la quantité
  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.slice(1)) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", color: "black" }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;