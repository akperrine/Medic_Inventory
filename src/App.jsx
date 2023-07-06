import { Outlet, Route, Routes } from "react-router-dom";
import Warehouse from "./routes/WarehouseLocation";
import Home from "./routes/Home";
import Navigation from "./routes/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Outlet />} />
        <Route index element={<Home />} />
        <Route path="/location" element={<Warehouse />} />
      </Routes>
    </>
  );
};

export default App;
