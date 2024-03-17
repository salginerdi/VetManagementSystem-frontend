import "./App.css";
import { Routes, Route } from "react-router-dom";
import Customer from "./Pages/Customer/Customer";
import Doctor from "./Pages/Doctor/Doctor";
import Animal from "./Pages/Animal/Animal";
import Appointment from "./Pages/Appointment/Appointment";
import AvailableDate from "./Pages/AvailableDate/AvailableDate";
import Report from "./Pages/Report/Report";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/musteri" element={<Customer />} />
        <Route path="/doktor" element={<Doctor />} />
        <Route path="/hayvan" element={<Animal />} />
        <Route path="/randevu" element={<Appointment />} />
        <Route path="/available-date" element={<AvailableDate />} />
        <Route path="/rapor" element={<Report />} />
        <Route path="/asi" element={<Vaccine />} />
      </Routes>
    </>
  );
}

export default App;
