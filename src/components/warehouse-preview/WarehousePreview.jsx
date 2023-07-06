import { useState } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import "./WarehousePreview.css";
import {
  getWarehouses,
  updateWarehouse,
} from "../../utils/warehouseAPI/WarehouseApi";

function WarehousePreview({ warehouse, setWarehouses }) {
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  console.log(warehouse);

  const handleToggleUpdate = () => setToggleUpdateForm(!toggleUpdateForm);

  const handleUpdateSubmit = async (e) => {
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

  const handleChange = (e) => setLocationInput(e.target.value);

  return (
    <div className="warehouse-preview-container">
      {toggleUpdateForm ? (
        <form className="add-warehouse-form" onSubmit={handleUpdateSubmit}>
          <label>Add a new location</label>
          <input onChange={handleChange} />
          <div className="add-warehouse-form-btn-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleToggleUpdate}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <h6 className="preview-location">
          Location:
          <br /> {warehouse.location}
        </h6>
      )}
      <Link className="preview-link" to={"/location"} state={warehouse}>
        Manage Inventory
      </Link>
      <div className="preview-btn-container">
        <button className="preview-change-btn" onClick={handleToggleUpdate}>
          <AiTwotoneEdit />
        </button>
        <button className="preview-change-btn">
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  );
}

export default WarehousePreview;
