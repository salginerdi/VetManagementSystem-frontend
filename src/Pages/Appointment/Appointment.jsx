import { useState, useEffect } from "react";
import "./Appointment.css";
import {
  getAppointments,
  deleteAppointments,
  searchDateAndAnimal,
  searchDateAndDoctor,
} from "../../API/Appointment";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import { getAnimals } from "../../API/Animal";
import { getDoctors } from "../../API/Doctor";
import AddAppointment from "../../Components/Appointment/AddAppointment";
import UpdateAppointment from "../../Components/Appointment/UpdateAppointment";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [searchTermDate, setSearchTermDate] = useState([]);
  const [searchTermAnimal, setSearchTermAnimal] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [reload, setReload] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getAppointments().then((data) => {
      setFilteredAppointments(data);
      setAppointments(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
    });
    getDoctors().then((data) => {
      setDoctors(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteAppointments(id).then(() => {
      setReload(true);
    });
  };

  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);

  const handleUpdateBtn = (app) => {
    setUpdateAppointment({
      id: app.id,
      appointmentDate: app.appointmentDate,
      animal: app.animal,
      doctor: app.doctor,
    });
  };

  const appointment = {
    id: 0,
    appointmentDate: "",
    doctor: {
      id: 0,
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    },
    animal: {
      id: 0,
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
    },
  };

  const [updateAppointment, setUpdateAppointment] = useState(appointment);

  useEffect(() => {
    if (
      searchTermDate[0] === "" &&
      searchTermDate[1] === "" &&
      searchTermDate[2] === ""
    ) {
      setFilteredAppointments(appointments);
    }
  }, [searchTermDate]);

  useEffect(() => {
    if (
      searchTermDate[0] === "" &&
      searchTermDate[1] === "" &&
      searchTermDate[2] === ""
    ) {
      setFilteredAppointments(appointments);
    }
  }, [searchTermAnimal]);

  const handleInput = (event, index) => {
    setSearchTermDate((prev) => {
      let newArray = [...prev];

      newArray[index] = event.target.value;

      return newArray;
    });
  };

  const handleInputAnimal = (event, index) => {
    setSearchTermAnimal((prev) => {
      let newArray = [...prev];

      newArray[index] = event.target.value;

      return newArray;
    });
  };

  const handleSearch = () => {
    searchDateAndDoctor(...searchTermDate).then((data) => {
      setFilteredAppointments(data);
    });
  };

  const handleSearchInput = () => {
    searchDateAndAnimal(...searchTermAnimal).then((data) => {
      setFilteredAppointments(data);
    });
  };

  return (
    <>
      <h1>Randevular</h1>
      <hr />

      <AddAppointment setAppointments={setAppointments} />

      <hr />

      <UpdateAppointment
        appointment={appointment}
        animals={animals}
        doctors={doctors}
        setAppointments={setAppointments}
        updateAppointment={updateAppointment}
        setUpdateAppointment={setUpdateAppointment}
      />

      <hr />
      <h3>Kayıtlı Randevuların Listesi</h3>

      <div className="search-container">
        <span className="search-span">
          Doktor adı ve tarih aralığına göre{" "}
          <span className="inline-span">RANDEVU</span> ara:{" "}
        </span>
        <input
          className="search-text"
          type="text"
          placeholder="Doktor Adı"
          value={searchTermDate[0]}
          onChange={(event) => handleInput(event, 0)}
        />
        <input
          className="search-date"
          type="date"
          placeholder="Başlangıç Tarihi"
          value={searchTermDate[1]}
          onChange={(event) => handleInput(event, 1)}
        />
        <input
          className="search-date"
          type="date"
          placeholder="Bitiş Tarihi"
          value={searchTermDate[2]}
          onChange={(event) => handleInput(event, 2)}
        />
        <button onClick={handleSearch} className="search-button">
          Ara
        </button>
      </div>

      <div className="search-container">
        <span className="search-span">
          Hayvan adı ve tarih aralığına göre{" "}
          <span className="inline-span">RANDEVU</span> ara:{" "}
        </span>
        <input
          className="search-text"
          type="text"
          placeholder="Hayvan Adı"
          value={searchTermAnimal[0]}
          onChange={(event) => handleInputAnimal(event, 0)}
        />
        <input
          className="search-date"
          type="date"
          placeholder="Başlangıç Tarihi"
          value={searchTermAnimal[1]}
          onChange={(event) => handleInputAnimal(event, 1)}
        />
        <input
          className="search-date"
          type="date"
          placeholder="Bitiş Tarihi"
          value={searchTermAnimal[2]}
          onChange={(event) => handleInputAnimal(event, 2)}
        />
        <button onClick={handleSearchInput} className="search-button">
          Ara
        </button>
      </div>

      <div className="appointment-list">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="appointment-info">
            <div className="appointment-name">
              {appointment.appointmentDate}{" "}
              <span className="appointment-remove-icon">
                <RemoveCircleIcon
                  onClick={() => handleDelete(appointment.id)}
                  id={appointment.id}
                />
              </span>{" "}
              <span
                className="appointment-update-icon"
                onClick={() => handleUpdateBtn(appointment)}
              >
                <FlipCameraAndroidIcon />
              </span>
            </div>
            <div className="content">{appointment?.animal?.name}</div>
            <div className="content">{appointment?.doctor?.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Appointment;
