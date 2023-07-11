import { Outlet, Route, Routes } from "react-router-dom";
import Warehouse from "./routes/warehouseInventory/WarehouseInventory";
import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Navigation />
      <Routes className="body-container">
        <Route path="/" element={<Outlet />} />
        <Route index element={<Home />} />
        <Route path="/location" element={<Warehouse />} />
      </Routes>
    </div>
  );
};

export default App;
