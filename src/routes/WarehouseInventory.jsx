import { useLocation } from "react-router-dom";

const WarehouseLocation = () => {
  const location = useLocation();
  console.log(location.state);
  const warehouse = location.state;

  return (
    <>
      <div>
        <h2>{warehouse.location}</h2>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Maximum Capacity</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {warehouse.warehouseItems.map((item) => (
              <tr key={item.id}>
                <td>{item.item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.maxCapacity}</td>
                <td>
                  <button>
                    <img src="pencil-icon.png" alt="Edit" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WarehouseLocation;
