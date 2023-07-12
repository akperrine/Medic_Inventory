function UpdateInventoryForm(props: {
  handleEditSubmit;
  handleFormChange;
  handleToggleNone;
}) {
  return (
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
  );
}

export default UpdateInventoryForm;
