import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import WarehousePreview from "../../components/warehouse-preview/WarehousePreview";

export default function Home() {
  const [warehouses, setWarehouses] = useState([]);
  const [toggleAddForm, setToggleAddForm] = useState(false);
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
  console.log(warehouses);

  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const response = await fetch("http://localhost:8080/warehouse");
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };
    getWarehouses();
  }, []);

  return (
    <div className="home-container">
      <Link to={"/location"}>Link to the Warehouse</Link>
      <h3>Current Warehouses</h3>
      <form>
        <input />
        <button>Submit</button>
      </form>
      <ul>
        {warehouses.map((warehouse) => (
          <WarehousePreview />
        ))}
      </ul>
    </div>
  );
}
