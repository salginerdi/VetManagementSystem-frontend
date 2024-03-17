import { getAnimals } from "../../API/Animal";
import { createVaccines } from "../../API/Vaccine";
import { useEffect, useState } from "react";
import { getReports } from "../../API/Report";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const AddVaccine = ({ setVaccines }) => {
  const addVaccine = {
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: {
      id: 0,
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
    },
    report: {
      title: "string",
      diagnosis: "string",
      price: 0,
    },
  };

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
    });

    getReports().then((data) => {
      setReports(data);
    });
  }, []);

  const [newVaccine, setNewVaccine] = useState(addVaccine);

  const handleNewVaccine = (event) => {
    setNewVaccine({
      ...newVaccine,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createVaccines(newVaccine)
      .then((data) => {
        setVaccines((previousArray) => [...previousArray, data]);
      })
      .catch((error) => {
        setErrorMessage(
          "Aşı eklenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
        );
        setErrorModalOpen(true);
      });
    setNewVaccine(addVaccine);
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const handleAnimalSelect = (event) => {
    setNewVaccine({
      ...newVaccine,
      [event.target.name]: animals.find(
        (obj) => obj.id === parseInt(event.target.value)
      ),
    });
  };

  const handleReportSelect = (event) => {
    setNewVaccine({
      ...newVaccine,
      [event.target.name]: reports.find(
        (obj) => obj.id === parseInt(event.target.value)
      ),
    });
  };

  return (
    <div>
      <div className="vaccine-inputs">
        <h3>Yeni Aşı Ekle</h3>
        <input
          type="text"
          name="name"
          value={newVaccine.name}
          placeholder="Aşı ismi giriniz."
          onChange={handleNewVaccine}
        />
        <input
          type="number"
          name="code"
          value={newVaccine.code}
          placeholder="Aşı kodu giriniz."
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          name="protectionStartDate"
          value={newVaccine.protectionStartDate}
          placeholder="Aşı koruma başlangıç tarihi giriniz."
          onChange={handleNewVaccine}
        />
        <input
          type="date"
          name="protectionFinishDate"
          value={newVaccine.protectionFinishDate}
          placeholder="Aşı koruma bitiş tarihi giriniz."
          onChange={handleNewVaccine}
        />

        <select
          name="animal"
          value={newVaccine?.animal?.id}
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
          name="report"
          value={newVaccine?.report?.id}
          onChange={handleReportSelect}
        >
          <option value="">Rapor Seçiniz</option>
          {reports.map((report) => (
            <option key={report.id} value={report.id}>
              {report.title}
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

export default AddVaccine;
