import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import "./WarehouseInventory.css";
import {
  addInvevtory,
  deleteInvevtory,
  updateInvevtory,
} from "../../utils/warehouseAPI/InventoryApi";
import {
  getSingleWarehouse,
  getWarehouses,
} from "../../utils/warehouseAPI/WarehouseApi";

const initialAddFormInput = {
  itemName: "",
  quantity: "",
  maxCapacity: "",
};

const WarehouseInventory = () => {
  const location = useLocation();
  // const [toggleAddInventory, setToggleAddInventory] = useState(false);
  const [option, setOption] = useState("none");
  const [editItemId, setEditItemId] = useState(null);
  const [warehouse, setWarehouse] = useState(location.state.warehouse);
  const [formInput, setFormInput] = useState(initialAddFormInput);
  const [toggleDelete, setToggleDelete] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormInput({ ...formInput, [name]: value });
  };

  const handleToggleAdd = () => setOption("add");
  const handleToggleNone = () => {
    setOption("none");
    setEditItemId(null);
  };
  const handleToggleEdit = (itemToEdit) => {
    console.log(itemToEdit);
    const {
      item: { itemName, itemId },
      quantity,
      maxCapacity,
    } = itemToEdit;
    setOption("edit");
    setFormInput({
      itemName: itemName,
      quantity: quantity,
      maxCapacity: maxCapacity,
    });
    setEditItemId(itemId);
  };

  const handleToggleDelete = () => setToggleDelete(!toggleDelete);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { quantity, maxCapacity } = formInput;
    if (
      (/^\d+$/.test(quantity) || /^\d+$/.test(maxCapacity)) &&
      quantity <= maxCapacity
    ) {
      const inventoryDataPayload = {
        ...formInput,
        warehouseId: warehouse.warehouseId,
      };
      await addInvevtory(inventoryDataPayload);
      await getSingleWarehouse(warehouse.warehouseId)
        .then((jsonData) => setWarehouse(jsonData))
        .catch((error) => console.log("Error:", error));
      setFormInput(initialAddFormInput);
      handleToggleNone();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { itemName, quantity, maxCapacity } = formInput;
    if (
      (/^\d+$/.test(quantity) || /^\d+$/.test(maxCapacity)) &&
      quantity <= maxCapacity
    ) {
      const inventoryDataPayload = {
        ...formInput,
        warehouseId: warehouse.warehouseId,
      };
      await updateInvevtory(editItemId, inventoryDataPayload);
      await getSingleWarehouse(warehouse.warehouseId)
        .then((jsonData) => setWarehouse(jsonData))
        .catch((error) => console.log("Error:", error));
      setFormInput(initialAddFormInput);
      handleToggleNone();
    }
  };

  const handleDelete = async (e, item) => {
    e.preventDefault();
    console.log(item, warehouse.warehouseId);
    const permission = prompt(
      `Are you sure you want to delete item: ${item.item.itemName}\n from Warehouse: ${warehouse.location}?\n
      Type YES to delete permanently.`
    );
    const formattedPermission = permission.toLowerCase().trim();
    if (formattedPermission === "yes") {
      await deleteInvevtory(item.item.itemId, warehouse.warehouseId);
      await getSingleWarehouse(warehouse.warehouseId)
        .then((jsonData) => setWarehouse(jsonData))
        .catch((error) => console.log("Error:", error));
    }
    console.log("deleted successful");
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
            <th>{toggleDelete ? "Delete" : "Edit"}</th>
          </tr>
        </thead>
        <tbody>
          {warehouse.warehouseItems.map((item) => (
            <tr key={item.item.itemId} className="inventory-row">
              <td>{item.item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.maxCapacity}</td>
              <td>
                {toggleDelete ? (
                  <button className="preview-change-btn">
                    <HiOutlineTrash onClick={(e) => handleDelete(e, item)} />
                  </button>
                ) : (
                  <button className="preview-change-btn">
                    <AiTwotoneEdit onClick={() => handleToggleEdit(item)} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {option == "add" && (
          <form className="inventory-add-form" onSubmit={handleAddSubmit}>
            <h2>Add an Item</h2>
            <label>Item Name</label>
            <input name="itemName" onChange={handleFormChange} required />
            <label>Quantity</label>
            <input name="quantity" onChange={handleFormChange} required />
            <label>Maximum Capacity</label>
            <input name="maxCapacity" onChange={handleFormChange} required />
            <div className="add-warehouse-form-btn-container">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleToggleNone}>
                Cancel
              </button>
            </div>
          </form>
        )}
        {option == "edit" && (
          <form className="inventory-add-form" onSubmit={handleEditSubmit}>
            <h2>Edit Item</h2>
            <label>Item Name</label>
            <input
              name="itemName"
              value={formInput.itemName}
              onChange={handleFormChange}
              required
              disabled
            />
            <label>Quantity</label>
            <input
              name="quantity"
              value={formInput.quantity}
              onChange={handleFormChange}
              required
            />
            <label>Maximum Capacity</label>
            <input
              name="maxCapacity"
              value={formInput.maxCapacity}
              onChange={handleFormChange}
              required
            />
            <div className="add-warehouse-form-btn-container">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleToggleNone}>
                Cancel
              </button>
            </div>
          </form>
        )}
        {option == "none" && (
          <div className="inv-btn-container">
            <button className="inv-btn" onClick={handleToggleAdd}>
              Add an Item
            </button>
            <button className="inv-btn" onClick={handleToggleDelete}>
              {toggleDelete ? "Cancel Delete" : "Delete an Item"}
            </button>
          </div>
        )}
        {/* {toggleAddInventory ? (
          <form className="inventory-add-form" onSubmit={handleAddSubmit}>
            <h2>Add an Item</h2>
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
        )} */}
      </div>
    </div>
  );
};

export default WarehouseInventory;
