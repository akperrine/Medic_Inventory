import { useEffect, useState } from "react";
import {
  addWarehouse,
  getWarehouses,
} from "../../utils/warehouseAPI/WarehouseApi";
import WarehousePreview from "../../components/warehouse-preview/WarehousePreview";
import "./Home.css";

export default function Home() {
  const [warehouses, setWarehouses] = useState([]);
  const [toggleAddForm, setToggleAddForm] = useState(false);
  const [locationInput, setLocationInput] = useState("");

  //Set Warehouses
  useEffect(() => {
    getWarehouses()
      .then((jsonData) => setWarehouses(jsonData))
      .catch((error) => console.log("Error:", error));
  }, []);

  const handleAddFormVisabiltiy = () => setToggleAddForm(!toggleAddForm);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (locationInput.trim() === "") {
      console.log(locationInput);
      console.log("work");
      alert("Location must not be empty");
      return;
    }

    try {
      await addWarehouse(locationInput);
      getWarehouses()
        .then((jsonData) => setWarehouses(jsonData))
        .catch((error) => console.log("Error:", error));
      setLocationInput("");
      setToggleAddForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => setLocationInput(e.target.value);

  return (
    <div className="home-container">
      <h3>Current Warehouses</h3>
      {toggleAddForm ? (
        <form className="add-warehouse-form" onSubmit={handleFormSubmit}>
          <label>Add a new location</label>
          <input onChange={handleChange} />
          <div className="add-warehouse-form-btn-container">
            <button type="button">Submit</button>
            <button type="button" onClick={handleAddFormVisabiltiy}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={handleAddFormVisabiltiy}
          className="effect-btn inv-btn"
        >
          Add warehouse {"\u271A"}
        </button>
      )}

      <ul className="warehouse-list">
        {warehouses.map((warehouse) => (
          <WarehousePreview
            key={warehouse.warehouseId}
            warehouse={warehouse}
            setWarehouses={setWarehouses}
          />
        ))}
      </ul>
    </div>
  );
}
