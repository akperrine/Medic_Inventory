import { useEffect, useRef, useState } from "react";
import {
  addWarehouse,
  getWarehouses,
} from "../../utils/warehouseAPI/WarehouseApi";
import { Iwarehouse, Iitem, Iinventory } from "../../types";
import WarehousePreview from "../../components/warehouse-preview/WarehousePreview";
import "./Home.css";

export default function Home() {
  const [warehouses, setWarehouses] = useState<Iwarehouse[]>([]);
  const [toggleAddForm, setToggleAddForm] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus cursor on input when Add Warehouse button clicked
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleAddForm]);

  //Set Warehouses
  useEffect(() => {
    getWarehouses()
      .then((jsonData) => setWarehouses(jsonData))
      .catch((error) => console.log("Error:", error));
  }, []);

  const handleAddFormVisabiltiy = () => setToggleAddForm(!toggleAddForm);

  const handleFormSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
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

  // Update Edit Location state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocationInput(e.target.value);

  return (
    <div className="home-container">
      <h3>Current Warehouses</h3>
      {toggleAddForm ? (
        <form className="add-warehouse-form" onSubmit={handleFormSubmit}>
          <label>Add a new location</label>
          <input onChange={handleChange} ref={inputRef} />
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
