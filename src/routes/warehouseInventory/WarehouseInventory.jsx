import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import "./WarehouseInventory.css";

const WarehouseLocation = () => {
  const [toggleAddInventory, setToggleAddInventory] = useState(false);
  const location = useLocation();
  const warehouse = location.state;

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
      <div className="inv-btn-container">
        <button className="inv-btn">Add an Item</button>
        <button className="inv-btn">Delete an Item</button>
      </div>
    </div>
  );
};

export default WarehouseLocation;
