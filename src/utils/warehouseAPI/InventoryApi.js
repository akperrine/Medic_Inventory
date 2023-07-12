export const addInvevtory = async (newInvPayload) => {
  return await fetch("http://localhost:8080/inventory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInvPayload),
  });
};

export const updateInvevtory = async (itemId, invPayloadToUpdate) => {
  return await fetch(`http://localhost:8080/inventory/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invPayloadToUpdate),
  });
};

export const deleteInvevtory = async (itemId, warehouseId) => {
  return await fetch(
    `http://localhost:8080/inventory/${itemId}/${warehouseId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
