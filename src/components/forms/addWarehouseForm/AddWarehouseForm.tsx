import { IaddWarehouseFormProps } from "../../../utils/types";
import "./AddWarehouseForm.css";

function AddWarehouseForm({
  handleFormSubmit,
  handleChange,
  inputRef,
  handleAddFormVisabiltiy,
}: IaddWarehouseFormProps) {
  return (
    <form className="add-warehouse-form" onSubmit={handleFormSubmit}>
      <label>Add a new location</label>
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
