import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import "./WarehousePreview.css";
import {
  deleteWarehouse,
  getWarehouses,
  updateWarehouse,
} from "../../utils/warehouseAPI/WarehouseApi";

import { IWarehouse, IWarehousePreview } from "../../utils/types";
import { FormType } from "../../utils/enums";
import AddWarehouseForm from "../forms/addWarehouseForm/AddWarehouseForm";

function WarehousePreview(props: {
  warehouse: IWarehouse;
  setWarehouses: React.Dispatch<React.SetStateAction<IWarehouse[]>>;
}) {
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { warehouse, setWarehouses } = props;
  console.log(toggleUpdateForm);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleUpdateForm]);

  const handleToggleUpdate = () => setToggleUpdateForm(!toggleUpdateForm);

  const handleUpdateSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (locationInput.trim() === "") {
      console.log(locationInput);
      alert("Location must not be empty");
      return;
    }

    try {
      await updateWarehouse(warehouse.warehouseId, locationInput);
      await getWarehouses()
        .then((jsonData) => setWarehouses(jsonData))
        .catch((error) => console.log("Error:", error));
      setLocationInput("");
      setToggleUpdateForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = prompt("Are you sure you want to delete?");
    let formattedResponse;
    if (response) {
      formattedResponse = response.toLowerCase().trim();
    }
    if (formattedResponse == "yes") {
      deleteWarehouse(warehouse.warehouseId);
      alert(`Successfully deleted warehouse: ${warehouse.location}`);
      await getWarehouses()
        .then((jsonData) => setWarehouses(jsonData))
        .catch((error) => console.log("Error:", error));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLocationInput(e.target.value);

  return (
    <div className="warehouse-preview-container">
      {toggleUpdateForm ? (
        <AddWarehouseForm
          handleFormSubmit={handleUpdateSubmit}
          handleChange={handleChange}
          inputRef={inputRef}
          handleAddFormVisabiltiy={handleToggleUpdate}
          addOrUpdate={FormType.UPDATE}
        />
      ) : (
        <h6 className="preview-location">
          Location:
          <br /> {warehouse.location}
        </h6>
      )}
      <Link className="preview-link" to={"/location"} state={{ warehouse }}>
        Manage Inventory
      </Link>
      <div className="preview-btn-container">
        <button className="preview-change-btn" onClick={handleToggleUpdate}>
          <AiTwotoneEdit />
        </button>
        <button className="preview-change-btn" onClick={handleToggleDelete}>
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  );
}

export default WarehousePreview;
