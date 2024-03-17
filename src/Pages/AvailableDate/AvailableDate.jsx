import { useState, useEffect } from "react";
import "./AvailableDate.css";
import {
  getDates,
  deleteDates,
  createDates,
  updateDatesFunc,
} from "../../API/AvailableDate";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { getDoctors } from "../../API/Doctor";

function AvailableDate({doctors}) {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dates, setDates] = useState([]);
  const [reload, setReload] = useState(true);
  const [newDate, setNewDate] = useState({
    availableDate: "",
  });

  useEffect(() => {
    getDates().then((data) => {
      setDates(data);
      console.log(data)
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteDates(id).then(() => {
      setReload(true);
    });
  };

  const handleNewDate = (event) => {
    if (event.target.name === "doctor") {
      return setNewDate({
        ...newDate,
        doctor: doctors.find(obj => obj.id === parseInt(event.target.value)),
      });
    } else {
      setNewDate({
        ...newDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    console.log(newDate)
    createDates(newDate).then((data) => {
      console.log(data)
    setDates(prev => [...prev, data])
      setReload(true);
    })
    .catch((error) => {
      setErrorMessage(
        "Müsait tarih eklenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
      );
      setErrorModalOpen(true);
    });
    setNewDate({
      availableDate: "",
    });
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const [updateDate, setUpdateDate] = useState({
    id: "",
    availableDate: "",
  });

  const handleUpdateBtn = (av) => {
    setUpdateDate({
      id: av.id,
      availableDate: av.availableDate,
      doctor: av.doctor,
    });
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "doctor") {
      const doctorId = parseInt(event.target.value);
      const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);
      setUpdateDate({
        ...updateDate,
        doctor: selectedDoctor,
      });
    } else {
      setUpdateDate({
        ...updateDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateDatesFunc(updateDate).then(() => {
      setReload(true);
    })
    .catch((error) => {
      setErrorMessage(
        "Müsait tarih bilgisi güncellenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
      );
      setErrorModalOpen(true);
    });
    setUpdateDate({
      id: "",
      availableDate: "",
    });
  };
  return (
    <>
      <h1>Müsait Tarihler</h1>
      <hr />
      <div className="date-inputs">
        <h3>Yeni Tarih Ekle</h3>
        <input
          type="date"
          name="availableDate"
          value={newDate.availableDate}
          placeholder="Müsait tarihleri giriniz."
          onChange={handleNewDate}
        />

        <select
          name="doctor"
          value={newDate?.doctor?.id}
          onChange={handleNewDate}
        >
          <option value="" selected disabled>
            Doktor Seçiniz
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>Kayıt Ekle</button>
      </div>
      <hr />
      <div className="date-update-inputs">
        <h3>Tarih Bilgilerini Güncelle</h3>
        <input
          className="date-input"
          type="date"
          name="availableDate"
          value={updateDate.availableDate}
          placeholder="Müsait tarih bilgisini güncelleyiniz."
          onChange={handleUpdateChange}
        />

        <select
          name="doctor"
          value={updateDate?.doctor?.id}
          onChange={handleUpdateChange}
        >
          <option value="" selected disabled>
            Doktor Seçiniz
          </option>
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

      <hr />
      <h3>Müsait Tarih Listesi</h3>
      <div className="date-list">
        {dates.map((date) => (
          <div key={date.id} className="date-info">
            <div className="date-title">
              {date.availableDate}{" "}
              <span className="date-remove-icon">
                <PersonRemoveIcon
                  onClick={() => handleDelete(date.id)}
                  id={date.id}
                />
              </span>{" "}
              <span
                className="date-update-icon"
                onClick={() => handleUpdateBtn(date)}
              >
                <ManageAccountsIcon />
              </span>
            </div>
            <div className="content">{date?.doctor?.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AvailableDate;
