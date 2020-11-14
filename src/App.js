import logo from "./logo.svg";
import "./App.css";
import { ProductCard } from "./components/ProductCard";

const product = {
  price: 777.77,
  name: "Bunnu's chair",
  description: "fancy chair, like new",
  image: logo,
};

function App() {
  return (
    <div className="App">
      <ProductCard product={product} />
    </div>
  );
}

export default App;
