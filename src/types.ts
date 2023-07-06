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
