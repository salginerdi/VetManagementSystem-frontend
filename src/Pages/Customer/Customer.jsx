import { useState, useEffect } from "react";
import "./Customer.css";
import {
  getCustomers,
  deleteCustomers,
  createCustomers,
  updateCustomersFunc,
  searchCustomersByName,
} from "../../API/Customer";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function Customer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [reload, setReload] = useState(true);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    getCustomers().then((data) => {
      setFilteredCustomers(data);
      setCustomers(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteCustomers(id).then(() => {
      setReload(true);
    });
  };

  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createCustomers(newCustomer)
      .then(() => {
        setReload(true);
      })
      .catch((error) => {
        setErrorMessage(
          "Müşteri eklenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
        );
        setErrorModalOpen(true);
      });
    setNewCustomer({
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

  const [updateCustomer, setUpdateCustomer] = useState({
    id: "",
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  const handleUpdateBtn = (cus) => {
    setUpdateCustomer({
      id: cus.id,
      name: cus.name,
      phone: cus.phone,
      mail: cus.mail,
      address: cus.address,
      city: cus.city,
    });
  };

  const handleUpdateChange = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateCustomersFunc(updateCustomer)
      .then(() => {
        setReload(true);
      })
      .catch((error) => {
        setErrorMessage(
          "Müşteri bilgisi güncellenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
        );
        setErrorModalOpen(true);
      });
    setUpdateCustomer({
      id: "",
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleUserInput = (event) => {
    const searchObj = event.target.value;
    setSearchTerm(searchObj);
    if (searchObj.trim() !== "") {
      searchCustomersByName(searchObj.trim()).then((data) => {
        setFilteredCustomers(data);
      });
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCustomers(customers);
    }
  }, [searchTerm]);

  return (
    <>
      <h1>Müşteriler</h1>
      <hr />

      <div className="customer-inputs">
        <h3>Yeni Müşteri Ekle</h3>

        <input
          type="text"
          name="name"
          value={newCustomer.name}
          placeholder="İsim ve soyisim giriniz."
          onChange={handleNewCustomer}
        />
        <input
          type="number"
          name="phone"
          value={newCustomer.phone}
          placeholder="Telefon numarası giriniz."
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          name="mail"
          value={newCustomer.mail}
          placeholder="Mail adresi giriniz."
          onChange={handleNewCustomer}
        />
        <textarea
          type="text"
          name="address"
          value={newCustomer.address}
          id=""
          cols="30"
          rows="10"
          placeholder="Adres bilgilerini giriniz."
          onChange={handleNewCustomer}
        ></textarea>
        <input
          type="text"
          name="city"
          value={newCustomer.city}
          placeholder="Şehir giriniz."
          onChange={handleNewCustomer}
        />
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

      <hr />
      <div className="customer-update-inputs">
        <h3>Müşteri Bilgilerini Güncelle</h3>
        <input
          className="name-input"
          type="text"
          name="name"
          value={updateCustomer.name}
          placeholder="İsim ve soyisim bilgilerini güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <input
          className="number-input"
          type="number"
          name="phone"
          value={updateCustomer.phone}
          placeholder="Telefon numarasını güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <input
          className="mail-input"
          type="text"
          name="mail"
          value={updateCustomer.mail}
          placeholder="Mail adresini güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <textarea
          className="address-area"
          type="text"
          name="address"
          value={updateCustomer.address}
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
          value={updateCustomer.city}
          onChange={handleUpdateChange}
        />
        <button className="update-button" onClick={handleUpdate}>
          Kaydı Güncelle
        </button>
      </div>

      <hr />
      <h3>Kayıtlı Müşterilerin Listesi</h3>

      <div className="search-container">
        <input
          className="search-text"
          type="text"
          placeholder="Müşteri ara..."
          value={searchTerm}
          onChange={handleUserInput}
        />
      </div>

      <div className="customer-list">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="customer-info">
            <div className="customer-name">
              {customer.name}{" "}
              <span className="customer-remove-icon">
                <PersonRemoveIcon
                  onClick={() => handleDelete(customer.id)}
                  id={customer.id}
                />
              </span>{" "}
              <span
                className="customer-update-icon"
                onClick={() => handleUpdateBtn(customer)}
              >
                <ManageAccountsIcon />
              </span>
            </div>
            <div className="content">{customer.phone}</div>
            <div className="content">{customer.mail}</div>
            <div className="content">{customer.address}</div>
            <div className="content">{customer.city}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Customer;
