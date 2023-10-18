import  { useState } from "react";
import { CATEGORIES } from "../data/categories";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const moveToPage = () => {
    navigate(`/${selectedCategory}`, { state: selectedCategory });
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <select onChange={handleSelectChange}>
          {CATEGORIES.map((category, index) => (
            <option key={`option-${index}`}>{category}</option>
          ))}
        </select>
        <button onClick={moveToPage}>Go</button>
      </div>
    </>
  );
}

export default Categories;
