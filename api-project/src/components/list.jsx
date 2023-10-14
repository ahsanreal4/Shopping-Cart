import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetProducts from "../hooks/queries/useGetProducts";

function List() {
  const location = useLocation();
  const [category] = useState(location.state);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { loading, result } = useGetProducts();

  useEffect(() => {
    if (!result || result.error || !result.data) return;

    setFilteredCategories(
      result.data.filter((item) => item.category == category)
    );
  }, [result]);

  if (loading || !result) return <h1> Loading... </h1>;

  const errorHeader = <h1>{result.error}</h1>;

  const filledStar = <i className="fa-solid fa-star"></i>;

  const unFilledStar = <i className="fa-regular fa-star"></i>;

  const rating = (cat, index) => (
    <div style={{ display: "flex" }} key={`rating-${index}`}>
      {new Array(Math.round(cat.rating.rate)).fill(0).map(() => filledStar)}
      {new Array(5 - Math.round(cat.rating.rate))
        .fill(0)
        .map(() => unFilledStar)}
    </div>
  );

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
          <img style={{ width: "100%", height: "200px" }} src={cat.image} />
          <h3>${cat.price}</h3>
          {rating(cat, index)}
          <h3>{cat.title}</h3>
          {/* <p>{cat.description}</p> */}
        </div>
      ))}
    </div>
  );

  return <div>{result.error ? errorHeader : content}</div>;
}

export default List;
