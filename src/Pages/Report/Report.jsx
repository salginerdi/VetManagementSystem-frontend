import { useState, useEffect } from "react";
import "./Report.css";
import {
  getReports,
  deleteReports,
  createReports,
  updateReportsFunc,
} from "../../API/Report";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { getAppointments } from "../../API/Appointment";

function Report() {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState([]);
  const [reload, setReload] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
  });

  useEffect(() => {
    getReports().then((data) => {
      setReport(data);
    });
    getAppointments().then((data) => {
      setAppointments(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteReports(id).then(() => {
      setReload(true);
    });
  };

  const handleNewReport = (event) => {
    if (event.target.name === "appointment") {
      return setNewReport({
        ...newReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createReports(newReport)
      .then(() => {
        setReload(true);
      })
      .catch((error) => {
        setErrorMessage(
          "Rapor eklenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
        );
        setErrorModalOpen(true);
      });
    setNewReport({
      title: "",
      diagnosis: "",
      price: "",
    });
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const [updateReport, setUpdateReport] = useState({
    id: "",
    title: "",
    diagnosis: "",
    price: "",
  });

  const handleUpdateBtn = (rep) => {
    setUpdateReport({
      id: rep.id,
      title: rep.title,
      diagnosis: rep.diagnosis,
      price: rep.price,
      appointment: rep.appointment,
    });
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "appointment") {
      const appointmentId = parseInt(event.target.value);
      const selectedAppointment = appointments.find(
        (appointment) => appointment.id === appointmentId
      );
      setUpdateReport({
        ...updateReport,
        appointment: selectedAppointment,
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateReportsFunc(updateReport).then(() => {
      setReload(true);
    })
    .catch((error) => {
      setErrorMessage("Rapor bilgisi güncellenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!");
      setErrorModalOpen(true);
    });
    setUpdateReport({
      title: "",
      diagnosis: "",
      price: "",
    });
  };

  return (
    <>
      <h1>Raporlama</h1>
      <hr />
      <div className="report-inputs">
        <h3>Yeni Rapor Ekle</h3>
        <input
          type="text"
          name="title"
          value={newReport.title}
          placeholder="Başlık giriniz."
          onChange={handleNewReport}
        />
        <textarea
          type="text"
          name="diagnosis"
          value={newReport.diagnosis}
          id=""
          cols="30"
          rows="10"
          placeholder="Teşhis bilgilerini giriniz."
          onChange={handleNewReport}
        ></textarea>

        <select
          name="appointment"
          value={newReport?.appointment?.id}
          onChange={handleNewReport}
        >
          <option value="" selected disabled>
            Randevu Seçiniz
          </option>
          {appointments.map((appointment) => (
            <option key={appointment.id} value={appointment.id}>
              {appointment.appointmentDate}
            </option>
          ))}
        </select>

        <div>
          <input
            type="number"
            name="price"
            value={newReport.price}
            placeholder="Toplam tutar."
            onChange={handleNewReport}
          />
          <span> ₺</span>
        </div>
        <button onClick={handleCreate}>Kayıt Ekle</button>
      </div>
      <hr />
      <div className="report-update-inputs">
        <h3>Rapor Bilgilerini Güncelle</h3>
        <input
          className="title-input"
          type="text"
          name="title"
          value={updateReport.title}
          placeholder="Başlık bilgisini güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <textarea
          className="diagnosis-area"
          type="text"
          name="diagnosis"
          value={updateReport.diagnosis}
          id=""
          cols="30"
          rows="10"
          placeholder="Teşhis bilgilerini güncelleyiniz."
          onChange={handleUpdateChange}
        ></textarea>

        <select
          name="appointment"
          value={updateReport?.appointment?.id}
          onChange={handleUpdateChange}
        >
          <option value="" selected disabled>
            Randevu Seçiniz
          </option>
          {appointments.map((appointment) => (
            <option key={appointment.id} value={appointment.id}>
              {appointment.appointmentDate}
            </option>
          ))}
        </select>

        <input
          className="price-input"
          type="number"
          name="price"
          placeholder="Fiyat bilgisini güncelleyiniz."
          value={updateReport.price}
          onChange={handleUpdateChange}
        />
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
      <h3>Rapor Listesi</h3>
      <div className="report-list">
        {report.map((report) => (
          <div key={report.id} className="report-info">
            <div className="report-title">
              {report.title}{" "}
              <span className="report-remove-icon">
                <DeleteSweepIcon
                  onClick={() => handleDelete(report.id)}
                  id={report.id}
                />
              </span>{" "}
              <span
                className="report-update-icon"
                onClick={() => handleUpdateBtn(report)}
              >
                <EditNoteIcon />
              </span>
            </div>
            <div className="content">{report.diagnosis}</div>
            <div className="content">
              {report?.appointment?.appointmentDate}
            </div>
            <div className="content">{report.price} ₺</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Report;
