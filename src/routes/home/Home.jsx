import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import WarehousePreview from "../../components/warehouse-preview/WarehousePreview";

export default function Home() {
  const [warehouses, setWarehouses] = useState([]);
  const [toggleAddForm, setToggleAddForm] = useState(false);
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);

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
      <h3>Current Warehouses</h3>
      {toggleAddForm ? (
        <form>
          <input />
          <button>Submit</button>
        </form>
      ) : (
        <button className="add-warehouse-btn">Add warehouse {"\u271A"}</button>
      )}

      <ul className="warehouse-list">
        {warehouses.map((warehouse) => (
          <WarehousePreview key={warehouse.warehouseId} warehouse={warehouse} />
        ))}
      </ul>
    </div>
  );
}
