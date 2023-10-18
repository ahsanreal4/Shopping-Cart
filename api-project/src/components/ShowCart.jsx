import { useLocation } from "react-router-dom";

function ShowCart() {
  const location = useLocation();
  const { cart } = location.state;
  console.log("ShowCart cart:", cart);

  if (!cart || cart.length === 0) {
    return <div>No items in the cart.</div>;
  }

  return (
    <div>
      <ul>
        {cart.map((item, index) => (
          <li key={`cart-item-${index}`}>
            <img src={item.image} alt="" width={200} height={200} />
            <div>
              <p>{item.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowCart;
