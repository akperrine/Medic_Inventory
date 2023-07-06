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
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
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

    try {
      // const response = await fetch("http://localhost:8080/warehouse", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ location: locationInput }),
      // });

      await addWarehouse(locationInput);

      await getWarehouses()
        .then((jsonData) => setWarehouses(jsonData))
        .catch((error) => console.log("Error:", error));
    } catch (error) {
      console.log(error);
    }
    setLocationInput("");
    setToggleAddForm(false);
  };

  const handleChange = (e) => {
    setLocationInput(e.target.value);
  };

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
        <button onClick={handleAddFormVisabiltiy} className="add-warehouse-btn">
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
