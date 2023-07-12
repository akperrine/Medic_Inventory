import { IAddWarehouseFormProps } from "../../../utils/types";
import "./AddWarehouseForm.css";

function AddWarehouseForm({
  handleFormSubmit,
  handleChange,
  handleAddFormVisabiltiy,
  inputRef,
  addOrUpdate,
}: IAddWarehouseFormProps) {
  return (
    <form className="add-warehouse-form" onSubmit={handleFormSubmit}>
      <label>
        {addOrUpdate === "add" ? "Add a new location" : "Update Location"}
      </label>
      <input onChange={handleChange} ref={inputRef} />
      <div className="add-warehouse-form-btn-container">
        <button type="button">Submit</button>
        <button type="button" onClick={handleAddFormVisabiltiy}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddWarehouseForm;
