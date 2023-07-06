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
import { FormType } from "../../utils/enums";
import { IInventory, IInventoryDTO, IWarehouse } from "../../utils/types";
import { getSingleWarehouse } from "../../utils/warehouseAPI/WarehouseApi";

const initialAddFormInput = {
  itemName: "",
  quantity: "",
  maxCapacity: "",
};

const WarehouseInventory = () => {
  const location = useLocation();
  const [option, setOption] = useState<FormType>(FormType.NONE);
  const [editItemId, setEditItemId] = useState(NaN);
  const [warehouse, setWarehouse] = useState<IWarehouse>(
    location.state.warehouse
  );
  const [formInput, setFormInput] = useState(initialAddFormInput);
  const [toggleDelete, setToggleDelete] = useState(false);

  const validateData = (quantity: string, maxCapacity: string) =>
    (/^\d+$/.test(quantity) || /^\d+$/.test(maxCapacity)) &&
    parseInt(quantity) <= parseInt(maxCapacity);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleToggleAdd = () => setOption(FormType.ADD);
  const handleToggleNone = () => {
    setOption(FormType.NONE);
    setEditItemId(NaN);
  };

  const handleToggleEdit = (itemToEdit: IInventory) => {
    console.log(itemToEdit);
    const {
      item: { itemName, itemId },
      quantity,
      maxCapacity,
    } = itemToEdit;

    setOption(FormType.UPDATE);
    setFormInput({
      itemName: itemName,
      quantity: quantity.toString(),
      maxCapacity: maxCapacity.toString(),
    });
    setEditItemId(itemId);
  };

  const handleToggleDelete = () => setToggleDelete(!toggleDelete);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formType: FormType
  ) => {
    e.preventDefault();
    const { itemName, quantity, maxCapacity } = formInput;
    const inventoryDataPayload: IInventoryDTO = {
      ...formInput,
      quantity: parseInt(quantity),
      maxCapacity: parseInt(maxCapacity),
      warehouseId: warehouse.warehouseId,
    };
    const validQuantityAndCapacity = validateData(quantity, maxCapacity);
    if (validQuantityAndCapacity) {
      if (formType === "add") {
        await addInvevtory(inventoryDataPayload);
      } else {
        await updateInvevtory(editItemId, inventoryDataPayload);
      }
      await getSingleWarehouse(warehouse.warehouseId)
        .then((jsonData) => setWarehouse(jsonData))
        .catch((error) => console.log("Error:", error));
      setFormInput(initialAddFormInput);
      handleToggleNone();
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<SVGElement>,
    item: IInventory
  ) => {
    e.preventDefault();
    console.log(item, warehouse.warehouseId);
    const permission = prompt(
      `Are you sure you want to delete item: ${item.item.itemName}\n from Warehouse: ${warehouse.location}?\n
      Type YES to delete permanently.`
    );
    let formattedPermission;
    if (permission) {
      formattedPermission = permission.toLowerCase().trim();
    }
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
          <form
            className="inventory-add-form"
            onSubmit={(e) => handleSubmit(e, FormType.ADD)}
          >
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
        {option == "update" && (
          <form
            className="inventory-add-form"
            onSubmit={(e) => handleSubmit(e, FormType.UPDATE)}
          >
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
      </div>
    </div>
  );
};

export default WarehouseInventory;
