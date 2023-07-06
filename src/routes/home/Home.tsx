import { FC, useEffect, useRef, useState } from "react";
import {
  addWarehouse,
  getWarehouses,
} from "../../utils/warehouseAPI/WarehouseApi";
import { IWarehouse, IItem, IInventory } from "../../utils/types";
import { FormType } from "../../utils/enums";
import WarehousePreview from "../../components/warehouse-preview/WarehousePreview";
import "./Home.css";
import AddWarehouseForm from "../../components/forms/addWarehouseForm/AddWarehouseForm";

export default function Home() {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [toggleAddForm, setToggleAddForm] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus cursor on input when Add Warehouse button clicked
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleAddForm]);

  //Set Warehouses with get request to back end
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

  const renderAddWarehouseFormOrButton = (): JSX.Element => {
    return toggleAddForm ? (
      <AddWarehouseForm
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
        inputRef={inputRef}
        handleAddFormVisabiltiy={handleAddFormVisabiltiy}
        addOrUpdate={FormType.ADD}
      />
    ) : (
      <button onClick={handleAddFormVisabiltiy} className="effect-btn inv-btn">
        Add warehouse {"\u271A"}
      </button>
    );
  };

  const renderWarehousePreview = (warehouse: IWarehouse): JSX.Element => (
    <WarehousePreview
      key={warehouse.warehouseId}
      warehouse={warehouse}
      setWarehouses={setWarehouses}
    />
  );

  return (
    <div className="home-container">
      {/* <CriticalInventory /> */}
      <h3>Current Warehouses</h3>
      {renderAddWarehouseFormOrButton()}
      <ul className="warehouse-list">
        {warehouses.map((warehouse) => renderWarehousePreview(warehouse))}
      </ul>
    </div>
  );
}
