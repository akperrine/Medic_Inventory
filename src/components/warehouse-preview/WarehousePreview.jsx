import { Link } from "react-router-dom";
import "./WarehousePreview.css";

function WarehousePreview({ warehouse }) {
  return (
    <div className="warehouse-preview-container">
      <h6 className="preview-location">Location: {warehouse.location}</h6>
      <Link className="preview-link" to={"/location"} state={warehouse}>
        Manage Inventory
      </Link>
    </div>
  );
}

export default WarehousePreview;
