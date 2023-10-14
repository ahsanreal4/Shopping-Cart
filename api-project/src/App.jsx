import "./App.css";
import Categories from "./components/categories";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CATEGORIES } from "./data/categories";
import List from "./components/list";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Categories} />
          {CATEGORIES.map((category, index) => (
            <Route
              key={`category-route-${index}`}
              path={category}
              Component={List}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
