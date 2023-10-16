import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetProducts from "../hooks/queries/useGetProducts";

function List() {
  const location = useLocation();
  const [category] = useState(location.state);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { loading, result } = useGetProducts();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (!result || result.error || !result.data) return;

    setFilteredCategories(result.data.filter((item) => item.category === category));
  }, [result]);

  if (loading || !result) return <h1> Loading... </h1>;

  const errorHeader = <h1>{result.error}</h1>;

  const filledStar = <i className="fa-solid fa-star"></i>;
  const unFilledStar = <i className="fa-regular fa-star"></i>;

  const rating = (cat, index) => (
    <div style={{ display: "flex" }} key={`rating-${index}`}>
      {new Array(Math.round(cat.rating.rate)).fill(0).map(() => filledStar)}
      {new Array(5 - Math.round(cat.rating.rate)).fill(0).map(() => unFilledStar)}
    </div>
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item !== product);
    setCart(updatedCart);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const buttonLabel = showCart ? "Hide Cart" : "Show Cart";

  const content = (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "40px",
      }}
    >
      {filteredCategories.map((cat, index) => (
        <div key={`categ-${index}`}>
          <img style={{ width: "100%", height: "200px" }} src={cat.image} alt={cat.title} />
          <h3>${cat.price}</h3>
          {rating(cat, index)}
          <h3>{cat.title}</h3>
          <p>{cat.description}</p>
          <button className="button-cart" onClick={() => addToCart(cat)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {result.error ? errorHeader : content}
      <button onClick={toggleCart} className="show-cart">
        {buttonLabel}
      </button>
      {showCart && (
        <ul>
          {cart.map((item, index) => (
            <li key={`cart-item-${index}`}>
              <img src={item.image} alt="" width={200} height={200} />
              <div>
              <button onClick={() => removeFromCart(item)} className="remove-from-cart">
                Remove from Cart
              </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
}

export default List;
