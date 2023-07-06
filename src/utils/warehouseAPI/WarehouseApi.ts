export const getWarehouses = async () => {
  try {
    const response = await fetch("http://localhost:8080/warehouse");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching warehouses:", error);
  }
};

export const getSingleWarehouse = async (id: number) => {
  try {
    console.log("url: ", `http://localhost:8080/warehouse/${id}`);
    const response = await fetch(`http://localhost:8080/warehouse/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching warehouses:", error);
  }
};

export const addWarehouse = async (location: string) => {
  return await fetch("http://localhost:8080/warehouse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location: location }),
  });
};

export const updateWarehouse = async (
  warehouseId: number,
  location: string
) => {
  return await fetch("http://localhost:8080/warehouse/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      warehouseId: warehouseId,
      location: location,
    }),
  });
};

export const deleteWarehouse = async (warehouseId: number) => {
  return await fetch(`http://localhost:8080/warehouse/delete/${warehouseId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
