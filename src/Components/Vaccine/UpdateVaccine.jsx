import { updateVaccinesFunc } from "../../API/Vaccine";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const UpdateVaccine = ({
  vaccine,
  animals,
  reports,
  setVaccines,
  updateVaccine,
  setUpdateVaccine,
}) => {
  const handleAnimalSelection = (event) => {
    const animalId = parseInt(event.target.value);

    const selectedAnimal = animals.find((animal) => animal.id === animalId);

    setUpdateVaccine({ ...updateVaccine, animal: selectedAnimal });
  };

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const handleReportSelection = (event) => {
    const reportId = parseInt(event.target.value);

    const selectedReport = reports.find((report) => report.id === reportId);

    setUpdateVaccine({ ...updateVaccine, report: selectedReport });
  };

  const handleUserInput = (event) => {
    setUpdateVaccine({
      ...updateVaccine,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateVaccinesFunc(updateVaccine)
      .then((data) => {
        setVaccines((previousArray) => [
          ...previousArray.filter((obj) => obj.id !== data.id),
          data,
        ]);
      })
      .catch((error) => {
        setErrorMessage(
          "Aşı bilgisi güncellenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
        );
        setErrorModalOpen(true);
      });
    setUpdateVaccine(vaccine);
  };

  return (
    <div>
      <div className="vaccine-update-inputs">
        <h3>Aşı Bilgilerini Güncelle</h3>
        <input
          className="name-input"
          type="text"
          name="name"
          value={updateVaccine.name}
          placeholder="Aşı ismini güncelleyiniz."
          onChange={handleUserInput}
        />
        <input
          className="code-input"
          type="number"
          name="code"
          placeholder="Aşı kodunu güncelleyiniz."
          value={updateVaccine.code}
          onChange={handleUserInput}
        />
        <input
          className="startDate-input"
          type="date"
          name="protectionStartDate"
          placeholder="Aşı koruma başlangıç tarihini güncelleyiniz."
          value={updateVaccine.protectionStartDate}
          onChange={handleUserInput}
        />
        <input
          className="finishDate-input"
          type="date"
          name="protectionFinishDate"
          placeholder="Aşı koruma bitiş tarihini güncelleyiniz."
          value={updateVaccine.protectionFinishDate}
          onChange={handleUserInput}
        />

        <select
          name="animal"
          value={updateVaccine?.animal?.id}
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
          name="report"
          value={updateVaccine?.report?.id}
          onChange={handleReportSelection}
        >
          <option value="">Rapor seçiniz</option>
          {reports.map((report) => (
            <option key={report.id} value={report.id}>
              {report.title}
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

export default UpdateVaccine;
