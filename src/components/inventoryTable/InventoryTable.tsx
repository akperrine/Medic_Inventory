import { AiTwotoneEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { IInventoryTableProps } from "../../utils/types";

function InventoryTable({
  warehouse,
  toggleDelete,
  handleDelete,
  handleToggleEdit,
}: IInventoryTableProps) {
  return (
    <>
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
    </>
  );
}

export default InventoryTable;
