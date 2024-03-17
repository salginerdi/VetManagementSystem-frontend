import { useState, useEffect } from "react";
import "./Animal.css";
import {
  getAnimals,
  deleteAnimals,
  createAnimals,
  updateAnimalsFunc,
  searchAnimalsByName,
  searchAnimalByCustomerName,
} from "../../API/Animal";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { getCustomers } from "../../API/Customer";

function Animal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCus, setSearchTermCus] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    getAnimals().then((data) => {
      setFilteredAnimals(data);
      setAnimals(data);
    });
    getCustomers().then((data) => {
      setCustomers(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteAnimals(id).then(() => {
      setReload(true);
    });
  };

  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      return setNewAnimal({
        ...newAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAnimals(newAnimal)
      .then(() => {
        setReload(true);
      })
      .catch((error) => {
        setErrorMessage(
          "Hayvan eklenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
        );
        setErrorModalOpen(true);
      });
    setNewAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
    });
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const [updateAnimal, setUpdateAnimal] = useState({
    id: "",
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
  });

  const handleUpdateBtn = (an) => {
    setUpdateAnimal({
      id: an.id,
      name: an.name,
      species: an.species,
      breed: an.breed,
      gender: an.gender,
      colour: an.colour,
      dateOfBirth: an.dateOfBirth,
      customer: an.customer,
    });
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "customer") {
      const customerId = parseInt(event.target.value);
      const selectedCustomer = customers.find(
        (customer) => customer.id === customerId
      );
      setUpdateAnimal({
        ...updateAnimal,
        customer: selectedCustomer,
      });
    } else {
      setUpdateAnimal({
        ...updateAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAnimalsFunc(updateAnimal)
      .then(() => {
        setReload(true);
      })
      .catch((error) => {
        setErrorMessage(
          "Hayvan bilgisi güncellenirken bir hata oluştu! Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz!"
        );
        setErrorModalOpen(true);
      });
    setUpdateAnimal({
      id: "",
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
    });
  };

  const handleUserInput = (event) => {
    const searchObj = event.target.value;
    setSearchTerm(searchObj);
    if (searchObj.trim() !== "") {
      searchAnimalsByName(searchObj.trim()).then((data) => {
        setFilteredAnimals(data);
      });
    }
  };

  const handleCustomerInput = (event) => {
    const searchObj = event.target.value;
    setSearchTermCus(searchObj);
    if (searchObj.trim() !== "") {
      searchAnimalByCustomerName(searchObj.trim()).then((data) => {
        setFilteredAnimals(data);
      });
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAnimals(animals);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTermCus.trim() === "") {
      setFilteredAnimals(animals);
    }
  }, [searchTermCus]);

  return (
    <>
      <h1>Hayvanlar</h1>
      <hr />

      <div className="animal-inputs">
        <h3>Yeni Hayvan Ekle</h3>
        <input
          type="text"
          name="name"
          value={newAnimal.name}
          placeholder="Hayvan ismini giriniz."
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          name="species"
          value={newAnimal.species}
          placeholder="Hayvan türünü giriniz."
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          name="breed"
          value={newAnimal.breed}
          placeholder="Hayvan cinsini giriniz."
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          name="gender"
          value={newAnimal.gender}
          placeholder="Hayvan cinsiyetini giriniz."
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          name="colour"
          value={newAnimal.colour}
          placeholder="Hayvan rengini giriniz."
          onChange={handleNewAnimal}
        />
        <input
          type="date"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          placeholder="Hayvan doğum tarihini giriniz."
          onChange={handleNewAnimal}
        />

        <select
          name="customer"
          value={newAnimal?.customer?.id}
          onChange={handleNewAnimal}
        >
          <option value="" selected disabled>
            Müşteri Seçiniz
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <button onClick={handleCreate}>Kayıt Ekle</button>
      </div>
      <hr />
      <div className="animal-update-inputs">
        <h3>Hayvan Bilgilerini Güncelle</h3>
        <input
          className="name-input"
          type="text"
          name="name"
          value={updateAnimal.name}
          placeholder="Hayvan isim bilgilerini güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <input
          className="species-input"
          type="text"
          name="species"
          value={updateAnimal.species}
          placeholder="Hayvan türünü güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <input
          className="breed-input"
          type="text"
          name="breed"
          value={updateAnimal.breed}
          placeholder="Hayvan cinsini güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <input
          className="gender-input"
          type="text"
          name="gender"
          value={updateAnimal.gender}
          placeholder="Hayvan cinsiyet bilgilerini güncelleyiniz."
          onChange={handleUpdateChange}
        />
        <input
          className="colour-input"
          type="text"
          name="colour"
          placeholder="Hayvan renk bilgisini güncelleyiniz."
          value={updateAnimal.colour}
          onChange={handleUpdateChange}
        />
        <input
          className="dateOfBirth-input"
          type="date"
          name="dateOfBirth"
          placeholder="Hayvan doğum tarihi bilgisini güncelleyiniz."
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateChange}
        />

        <select
          name="customer"
          value={updateAnimal?.customer?.id}
          onChange={handleUpdateChange}
        >
          <option value="" selected disabled>
            Müşteri Seçiniz
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <Dialog open={errorModalOpen} onClose={handleCloseErrorModal}>
          <DialogTitle>Hata</DialogTitle>
          <DialogContent dividers>
            <p>{errorMessage}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseErrorModal}>Kapat</Button>
          </DialogActions>
        </Dialog>

        <button className="update-button" onClick={handleUpdate}>
          Kaydı Güncelle
        </button>
      </div>
      <hr />
      <h3>Kayıtlı Hayvanların Listesi</h3>

      <div className="search-container">
        <input
          className="search-text"
          type="text"
          placeholder="Hayvan ara..."
          value={searchTerm}
          onChange={handleUserInput}
        />
      </div>

      <div className="search-container">
        <input
          className="search-text"
          type="text"
          placeholder="Müşteriye göre hayvan ara..."
          value={searchTermCus}
          onChange={handleCustomerInput}
        />
      </div>

      <div className="animal-list">
        {filteredAnimals.map((animal) => (
          <div key={animal.id} className="animal-info">
            <div className="animal-name">
              {animal.name}{" "}
              <span className="animal-remove-icon">
                <PersonRemoveIcon
                  onClick={() => handleDelete(animal.id)}
                  id={animal.id}
                />
              </span>{" "}
              <span
                className="animal-update-icon"
                onClick={() => handleUpdateBtn(animal)}
              >
                <ManageAccountsIcon />
              </span>
            </div>
            <div className="content">{animal.species}</div>
            <div className="content">{animal.breed}</div>
            <div className="content">{animal.gender}</div>
            <div className="content">{animal.colour}</div>
            <div className="content">{animal.dateOfBirth}</div>
            <div className="content">{animal?.customer?.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Animal;
