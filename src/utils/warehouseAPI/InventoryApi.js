export const addInvevtory = async (newInvPayload) => {
  console.log("inReq ", newInvPayload);
  return await fetch("http://localhost:8080/inventory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInvPayload),
  });
};
