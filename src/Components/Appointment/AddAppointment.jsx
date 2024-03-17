import { getAnimals } from "../../API/Animal";
import { createAppointments } from "../../API/Appointment";
import { useEffect, useState } from "react";
import { getDoctors } from "../../API/Doctor";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const AddAppointment = ({ setAppointments }) => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addAppointment = {
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
  const [animals, setAnimals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
    });

    getDoctors().then((data) => {
      setDoctors(data);
    });
  }, []);

  const [newAppointment, setNewAppointment] = useState(addAppointment);

  const handleNewAppointment = (event) => {
    setNewAppointment({
      ...newAppointment,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createAppointments(newAppointment)
      .then((data) => {
        setAppointments((previousArray) => [...previousArray, data]);
      })
      .catch((error) => {
        setErrorMessage("Randevu eklenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!");
        setErrorModalOpen(true);
      });
    setNewAppointment(addAppointment);
  };

  const handleDoctorSelect = (event) => {
    setNewAppointment({
      ...newAppointment,
      [event.target.name]: doctors.find(
        (obj) => obj.id === parseInt(event.target.value)
      ),
    });
  };

  const handleAnimalSelect = (event) => {
    setNewAppointment({
      ...newAppointment,
      [event.target.name]: animals.find(
        (obj) => obj.id === parseInt(event.target.value)
      ),
    });
  };

  return (
    <div>
      <div className="appointment-inputs">
        <h3>Yeni Randevu Ekle</h3>

        <input
          type="datetime-local"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          placeholder="Randevu saat ve tarihini giriniz."
          onChange={handleNewAppointment}
        />

        <select
          name="animal"
          value={newAppointment?.animal?.id}
          onChange={handleAnimalSelect}
        >
          <option value="">Hayvan Seçiniz</option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>

        <select
          name="doctor"
          value={newAppointment?.doctor?.id}
          onChange={handleDoctorSelect}
        >
          <option value="">Doktor Seçiniz</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>Kayıt Ekle</button>
      </div>
      <Dialog open={errorModalOpen} onClose={handleCloseErrorModal}>
        <DialogTitle>Hata</DialogTitle>
        <DialogContent dividers>
          <p>{errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAppointment;
