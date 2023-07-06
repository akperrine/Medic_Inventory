import { Link } from "react-router-dom";
import "./WarehousePreview.css";

function WarehousePreview({ warehouse }) {
  return (
    <div className="warehouse-preview-container">
      <h6>{warehouse.location}</h6>
      <Link to={"/location"} state={warehouse}>
        Click to Manage Inventory
      </Link>
    </div>
  );
}

export default WarehousePreview;
