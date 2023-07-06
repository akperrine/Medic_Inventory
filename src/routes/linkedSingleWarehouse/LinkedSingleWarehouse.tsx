import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  addInvevtory,
  deleteInvevtory,
  updateInvevtory,
} from "../../utils/warehouseAPI/InventoryApi";
import { FormType } from "../../utils/enums";
import { IInventory, IInventoryDTO, IWarehouse } from "../../utils/types";
import { getSingleWarehouse } from "../../utils/warehouseAPI/WarehouseApi";
import InventoryTable from "../../components/inventoryTable/InventoryTable";
import WarehouseInventory from "../warehouseInventory/WarehouseInventory";

const LinkedSingleWarehouse = () => {
  const location = useLocation();
  const [warehouse, setWarehouse] = useState<IWarehouse>(
    location.state.warehouse
  );
  return (
    <>
      <WarehouseInventory warehouse={warehouse} setWarehouse={setWarehouse} />
    </>
  );
};

export default LinkedSingleWarehouse;
