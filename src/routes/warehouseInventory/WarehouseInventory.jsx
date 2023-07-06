import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import "./WarehouseInventory.css";

const WarehouseInventory = () => {
  const location = useLocation();
  const [toggleAddInventory, setToggleAddInventory] = useState(false);
  const warehouse = location.state;

  const handleToggleAdd = () => setToggleAddInventory(!toggleAddInventory);

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
        <form className="inventory-form">
          <label>Item Name</label>
          <input />
          <label>Quantity</label>
          <input />
          <label>Maximum Capacity</label>
          <input />
          <div className="add-warehouse-form-btn-container">
            <button type="button">Submit</button>
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
