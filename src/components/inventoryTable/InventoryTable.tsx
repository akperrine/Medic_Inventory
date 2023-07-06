import { AiTwotoneEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { IInventoryTableProps } from "../../utils/types";

function InventoryTable({
  inventories,
  toggleDelete,
  handleDelete,
  handleToggleEdit,
}: IInventoryTableProps) {
  return (
    <>
      {/* <h2>{warehouse.location}</h2> */}
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
          {inventories.map((inventory) => (
            <tr key={inventory.item.itemId} className="inventory-row">
              <td>{inventory.item.itemName}</td>
              <td>{inventory.quantity}</td>
              <td>{inventory.maxCapacity}</td>
              <td>
                {toggleDelete ? (
                  <button className="preview-change-btn">
                    <HiOutlineTrash
                      onClick={(e) => handleDelete(e, inventory)}
                    />
                  </button>
                ) : (
                  <button className="preview-change-btn">
                    <AiTwotoneEdit
                      onClick={() => handleToggleEdit(inventory)}
                    />
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
