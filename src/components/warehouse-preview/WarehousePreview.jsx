import { Link } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import "./WarehousePreview.css";

function WarehousePreview({ warehouse }) {
  return (
    <div className="warehouse-preview-container">
      <h6 className="preview-location">Location: {warehouse.location}</h6>
      <Link className="preview-link" to={"/location"} state={warehouse}>
        Manage Inventory
      </Link>
      <div className="preview-btn-container">
        <button className="preview-change-btn">
          <AiTwotoneEdit />
        </button>
        <button className="preview-change-btn">
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  );
}

export default WarehousePreview;
