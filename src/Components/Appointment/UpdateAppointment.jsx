import { updateAppointmentsFunc } from "../../API/Appointment";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

const UpdateAppointment = ({
  appointment,
  animals,
  doctors,
  setAppointments,
  updateAppointment,
  setUpdateAppointment,
}) => {
  const handleAnimalSelection = (event) => {
    const animalId = parseInt(event.target.value);

    const selectedAnimal = animals.find((animal) => animal.id === animalId);

    setUpdateAppointment({ ...updateAppointment, animal: selectedAnimal });
  };

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const handleDoctorSelection = (event) => {
    const doctorId = parseInt(event.target.value);

    const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);

    setUpdateAppointment({ ...updateAppointment, doctor: selectedDoctor });
  };

  const handleUserInput = (event) => {
    setUpdateAppointment({
      ...updateAppointment,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateAppointmentsFunc(updateAppointment)
      .then((data) => {
        setAppointments((previousArray) => [
          ...previousArray.filter((obj) => obj.id !== data.id),
          data,
        ]);
      })
      .catch((error) => {
        setErrorMessage("Randevu bilgisi güncellenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!");
        setErrorModalOpen(true);
      });
    setUpdateAppointment(appointment);
  };

  return (
    <div>
      <div className="appointment-update-inputs">
        <h3>Randevu Bilgilerini Güncelle</h3>
        <input
          className="appointment-centered-input"
          type="datetime-local"
          name="appointmentDate"
          value={updateAppointment.appointmentDate}
          placeholder="Randevu saat ve tarih bilgilerini güncelleyiniz."
          onChange={handleUserInput}
        />

        <select
          name="animal"
          value={updateAppointment?.animal?.id}
          onChange={handleAnimalSelection}
        >
          <option value="">Hayvan seçiniz</option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>

        <select
          name="doctor"
          value={updateAppointment?.doctor?.id}
          onChange={handleDoctorSelection}
        >
          <option value="">Doktor seçiniz</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        <button className="update-button" onClick={handleUpdate}>
          Kaydı Güncelle
        </button>
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

export default UpdateAppointment;
