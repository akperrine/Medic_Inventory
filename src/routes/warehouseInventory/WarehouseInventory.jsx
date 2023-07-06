import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import "./WarehouseInventory.css";
import { addInvevtory } from "../../utils/warehouseAPI/InventoryApi";
import {
  getSingleWarehouse,
  getWarehouses,
} from "../../utils/warehouseAPI/WarehouseApi";

const WarehouseInventory = () => {
  const location = useLocation();
  const [toggleAddInventory, setToggleAddInventory] = useState(false);
  const [warehouse, setWarehouse] = useState(location.state.warehouse);
  const [addFormInput, setAddFormInput] = useState({
    itemName: "",
    quantity: "",
    maxCapacity: "",
  });
  console.log(warehouse);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setAddFormInput({ ...addFormInput, [name]: value });
  };

  const handleToggleAdd = () => setToggleAddInventory(!toggleAddInventory);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { quantity, maxCapacity } = addFormInput;
    if (
      (/^\d+$/.test(quantity) || /^\d+$/.test(maxCapacity)) &&
      quantity <= maxCapacity
    ) {
      console.log("Forms don't contain numbers");
      const inventoryDataPayload = {
        ...addFormInput,
        warehouseId: warehouse.warehouseId,
      };
      console.log(inventoryDataPayload);
      await addInvevtory(inventoryDataPayload);
      await getSingleWarehouse(warehouse.warehouseId)
        .then((jsonData) => setWarehouse(jsonData))
        .catch((error) => console.log("Error:", error));
    }
  };

  return (
    <div className="inventory-table-container">
      <h2>{warehouse.location}</h2>
      <table className="inventory-table">
        <thead className="inventory-table-head">
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Maximum Capacity</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {warehouse.warehouseItems.map((item) => (
            <tr key={item.id} className="inventory-row">
              <td>{item.item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.maxCapacity}</td>
              <td>
                <button className="preview-change-btn">
                  <AiTwotoneEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {toggleAddInventory ? (
        <form className="inventory-form" onSubmit={handleAddSubmit}>
          <label>Item Name</label>
          <input name="itemName" onChange={handleFormChange} required />
          <label>Quantity</label>
          <input name="quantity" onChange={handleFormChange} required />
          <label>Maximum Capacity</label>
          <input name="maxCapacity" onChange={handleFormChange} required />
          <div className="add-warehouse-form-btn-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleToggleAdd}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="inv-btn-container">
          <button className="inv-btn" onClick={handleToggleAdd}>
            Add an Item
          </button>
          <button className="inv-btn">Delete an Item</button>
        </div>
      )}
    </div>
  );
};

export default WarehouseInventory;
