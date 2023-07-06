import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import WarehousePreview from "../../components/warehouse-preview/WarehousePreview";

export default function Home() {
  const [warehouses, setWarehouses] = useState([]);
  const [toggleAddForm, setToggleAddForm] = useState(false);
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  console.log(locationInput);

  const getWarehouses = async () => {
    try {
      const response = await fetch("http://localhost:8080/warehouse");
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  const handleAddWarehouseForm = () => setToggleAddForm(!toggleAddForm);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/warehouse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: locationInput }),
      });

      await getWarehouses();

      if (response.ok) {
        console.log("Post request successful");
      } else {
        console.log("Post request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setLocationInput(e.target.value);
  };

  return (
    <div className="home-container">
      <h3>Current Warehouses</h3>
      {toggleAddForm ? (
        <form className="add-warehouse-form" onSubmit={handleAddWarehouseForm}>
          <label>Add a new location</label>
          <input onChange={handleChange} />
          <div className="add-warehouse-form-btn-container">
            <button type="button">Submit</button>
            <button onClick={handleFormSubmit}>Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={handleAddWarehouseForm} className="add-warehouse-btn">
          Add warehouse {"\u271A"}
        </button>
      )}

      <ul className="warehouse-list">
        {warehouses.map((warehouse) => (
          <WarehousePreview key={warehouse.warehouseId} warehouse={warehouse} />
        ))}
      </ul>
    </div>
  );
}
