import { ChangeEvent, FormEvent, RefObject } from "react";
import { FormType } from "./enums";

export interface IWarehouse {
  warehouseId: number;
  location: string;
  warehouseItems: IInventory[];
}

export interface IInventory {
  item: IItem;
  quantity: number;
  maxCapacity: number;
}

export interface IItem {
  itemId: number;
  itemName: string;
}

export interface IWarehousePreview {
  warehouse: IWarehouse;
  setWarehouses: React.Dispatch<React.SetStateAction<IWarehouse[]>>;
}

export interface IAddWarehouseFormProps {
  handleFormSubmit: (event: React.FocusEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  handleAddFormVisabiltiy: () => void;
  addOrUpdate: FormType;
}

export interface IInventoryTableProps {
  warehouse: IWarehouse;
  toggleDelete: boolean;
  handleDelete: (
    e: React.MouseEvent<SVGElement>,
    item: IInventory
  ) => Promise<void>;
  handleToggleEdit: (itemToEdit: IInventory) => void;
}

//API Data Types
export interface IInventoryDTO {
  warehouseId: number;
  itemName: string;
  quantity: number;
  maxCapacity: number;
}
