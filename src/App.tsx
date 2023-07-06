import { Outlet, Route, Routes } from "react-router-dom";
// import InventoryWarehouse from "./routes/warehouseInventory/WarehouseInventory";
import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import "./App.css";
import LinkedSingleWarehouse from "./routes/linkedSingleWarehouse/linkedSingleWarehouse";

const App = () => {
  return (
    <div className="app-container">
      <Navigation />
      <Routes>
        <Route path="/" element={<Outlet />} />
        <Route index element={<Home />} />
        <Route path="/location" element={<LinkedSingleWarehouse />} />
      </Routes>
    </div>
  );
};

export default App;
