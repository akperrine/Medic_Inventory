import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  // const [warehouses, setWarehouses]
  return (
    <div className="home-container">
      <Link to={"/location"}>Link to the Warehouse</Link>
      <h3>Current Warehouses</h3>
      <ul>{}</ul>
    </div>
  );
}
