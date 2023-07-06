import { ChangeEvent, FormEvent, RefObject } from "react";

export interface Iwarehouse {
  warehouseId: number;
  location: string;
  warehouseItems: Iinventory[];
}

export interface Iinventory {
  item: Iitem;
  quantity: number;
  maxCapacity: number;
}

export interface Iitem {
  itemId: number;
  itemName: string;
}

export interface IaddWarehouseFormProps {
  handleFormSubmit: (event: React.FocusEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  handleAddFormVisabiltiy: () => void;
}
