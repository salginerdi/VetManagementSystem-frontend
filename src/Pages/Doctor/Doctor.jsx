import { useState, useEffect } from "react";
import "./Doctor.css";
import {
  getDoctors,
  deleteDoctors,
  createDoctors,
  updateDoctorsFunc,
} from "../../API/Doctor";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AvailableDate from "../AvailableDate/AvailableDate"

function Doctor() {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [reload, setReload] = useState(true);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteDoctors(id).then(() => {
      setReload(true);
    });
  };

  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createDoctors(newDoctor).then(() => {
      setReload(true);
    })
    .catch((error) => {
      setErrorMessage(
        "Doktor eklenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
      );
      setErrorModalOpen(true);
    });
    setNewDoctor({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const [updateDoctor, setUpdateDoctor] = useState({
    id: "",
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  const handleUpdateBtn = (doc) => {
    setUpdateDoctor({
      id: doc.id,
      name: doc.name,
      phone: doc.phone,
      mail: doc.mail,
      address: doc.address,
      city: doc.city,
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateDoctorsFunc(updateDoctor).then(() => {
      setReload(true);
    })
    .catch((error) => {
      setErrorMessage(
        "Doktor bilgisi güncellenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
      );
      setErrorModalOpen(true);
    });
    setUpdateDoctor({
      id:"",
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  return (
    <>
      <h1>Doktorlar</h1>
      <hr />

      <div className="doctor-inputs">
        <h3>Yeni Doktor Ekle</h3>
        <input
          type="text"
          name="name"
          value={newDoctor.name}
          placeholder="İsim ve soyisim giriniz."
          onChange={handleNewDoctor}
        />
        <input
          type="number"
          name="phone"
          value={newDoctor.phone}
          placeholder="Telefon numarası giriniz."
          onChange={handleNewDoctor}
        />
        <input
          type="text"
          name="mail"
          value={newDoctor.mail}
          placeholder="Mail adresi giriniz."
          onChange={handleNewDoctor}
        />
        <textarea
          type="text"
          name="address"
          value={newDoctor.address}
          id=""
          cols="30"
          rows="10"
          placeholder="Adres bilgilerini giriniz."
          onChange={handleNewDoctor}
        ></textarea>
        <input
          type="text"
          name="city"
          value={newDoctor.city}
          placeholder="Şehir giriniz."
          onChange={handleNewDoctor}
        />
        <button onClick={handleCreate}>Kayıt Ekle</button>
      </div>
      <hr />
      <div className="doctor-update-inputs">
        <h3>Doktor Bilgilerini Güncelle</h3>
        <input
          className="name-input"
          type="text"
          name="name"
          value={updateDoctor.name}
          placeholder="İsim ve soyisim bilgilerini güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <input
        className="number-input"
          type="number"
          name="phone"
          value={updateDoctor.phone}
          placeholder="Telefon numarasını güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <input
        className="mail-input"
          type="text"
          name="mail"
          value={updateDoctor.mail}
          placeholder="Mail adresini güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <textarea
        className="address-area"
          type="text"
          name="address"
          value={updateDoctor.address}
          id=""
          cols="30"
          rows="10"
          placeholder="Adres bilgilerini güncelleyiniz."
          onChange={handleUpdateChange}
        ></textarea>
        <input
        className="city-input"
          type="text"
          name="city"
          placeholder="Şehir bilgisini güncelleyiniz."
          value={updateDoctor.city}
          onChange={handleUpdateChange}
        />
        <button className="update-button" onClick={handleUpdate}>Kaydı Güncelle</button>
      </div>
      <hr />

      <Dialog open={errorModalOpen} onClose={handleCloseErrorModal}>
          <DialogTitle>Hata</DialogTitle>
          <DialogContent dividers>
            <p>{errorMessage}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseErrorModal}>Kapat</Button>
          </DialogActions>
        </Dialog>

      <h3>Kayıtlı Doktorların Listesi</h3>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-info">
            <div className="doctor-name">
              {doctor.name}{" "}
              <span className="doctor-remove-icon">
                <PersonRemoveIcon
                  onClick={() => handleDelete(doctor.id)}
                  id={doctor.id}
                />
              </span>{" "}
              <span
                className="doctor-update-icon"
                onClick={() => handleUpdateBtn(doctor)}
              >
                <ManageAccountsIcon />
              </span>
            </div>
            <div className="content">{doctor.phone}</div>
            <div className="content">{doctor.mail}</div>
            <div className="content">{doctor.address}</div>
            <div className="content">{doctor.city}</div>
          </div>
        ))}
      </div>
      <hr />
      <AvailableDate doctors={doctors}/>
    </>
  );
}

export default Doctor;
