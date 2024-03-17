import { useState, useEffect } from "react";
import "./Vaccine.css";
import {
  getVaccines,
  deleteVaccines,
  searchVaccineByAnimalName,
  searchUpcomingVaccination,
} from "../../API/Vaccine";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UpdateIcon from "@mui/icons-material/Update";
import { getAnimals } from "../../API/Animal";
import { getReports } from "../../API/Report";
import AddVaccine from "../../Components/Vaccine/AddVaccine";
import UpdateVaccine from "../../Components/Vaccine/UpdateVaccine";

function Vaccine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDate, setSearchTermDate] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [reload, setReload] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [filteredVaccines, setFilteredVaccines] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getVaccines().then((data) => {
      setFilteredVaccines(data);
      setVaccines(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
    });
    getReports().then((data) => {
      setReports(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (id) => {
    deleteVaccines(id).then(() => {
      setReload(true);
    });
  };

  useEffect(() => {
    setFilteredVaccines(vaccines);
  }, [vaccines]);

  const handleUpdateBtn = (vac) => {
    setUpdateVaccine({
      id: vac.id,
      name: vac.name,
      code: vac.code,
      protectionStartDate: vac.protectionStartDate,
      protectionFinishDate: vac.protectionFinishDate,
      animal: vac.animal,
      report: vac.report,
    });
  };

  const vaccine = {
    id: 0,
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
      id: 0,
      title: "",
      diagnosis: "",
      price: "",
    },
  };

  const [updateVaccine, setUpdateVaccine] = useState(vaccine);

  const handleUserInput = (event) => {
    const searchObj = event.target.value;
    setSearchTerm(searchObj);
    if (searchObj.trim() !== "") {
      searchVaccineByAnimalName(searchObj.trim()).then((data) => {
        setFilteredVaccines(data);
      });
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredVaccines(vaccines);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTermDate[0] === "" && searchTermDate[1] === "") {
      setFilteredVaccines(vaccines);
    }
  }, [searchTermDate]);

  const handleInput = (event, index) => {
    setSearchTermDate((prev) => {
      let newArray = [...prev];

      newArray[index] = event.target.value;

      return newArray;
    });
  };

  const handleSearch = () => {
    searchUpcomingVaccination(...searchTermDate).then((data) => {
      setFilteredVaccines(data);
    });
  };

  return (
    <>
      <h1>Aşılar</h1>
      <hr />

      <AddVaccine setVaccines={setVaccines} />

      <hr />

      <UpdateVaccine
        vaccine={vaccine}
        animals={animals}
        reports={reports}
        setVaccines={setVaccines}
        updateVaccine={updateVaccine}
        setUpdateVaccine={setUpdateVaccine}
      />

      <hr />
      <h3>Kayıtlı Aşı Listesi</h3>

      <div className="search-container">
        <input
          className="search-text"
          type="text"
          placeholder="Hayvan adına göre aşı ara..."
          value={searchTerm}
          onChange={handleUserInput}
        />
      </div>

      <div className="search-container">
        <span className="search-span">
          {" "}
          Aşı koruma bitiş tarihine göre{" "}
          <span className="inline-span">AŞI</span> ara:{" "}
        </span>
        <input
          className="search-date"
          type="date"
          placeholder="Aşı başlangıç tarihi"
          value={searchTermDate[0]}
          onChange={(event) => handleInput(event, 0)}
        />
        <input
          className="search-date"
          type="date"
          placeholder="Aşı bitiş tarihi"
          value={searchTermDate[1]}
          onChange={(event) => handleInput(event, 1)}
        />

        <button onClick={handleSearch} className="search-button">
          Ara
        </button>
      </div>

      <div className="vaccine-list">
        {filteredVaccines.map((vaccine) => (
          <div key={vaccine.id} className="vaccine-info">
            <div className="vaccine-name">
              {vaccine.name}{" "}
              <span className="vaccine-remove-icon">
                <HighlightOffIcon
                  onClick={() => handleDelete(vaccine.id)}
                  id={vaccine.id}
                />
              </span>{" "}
              <span
                className="vaccine-update-icon"
                onClick={() => handleUpdateBtn(vaccine)}
              >
                <UpdateIcon />
              </span>
            </div>
            <div className="content">{vaccine.code}</div>
            <div className="content">{vaccine.protectionStartDate}</div>
            <div className="content">{vaccine.protectionFinishDate}</div>
            <div className="content">{vaccine?.animal?.name}</div>
            <div className="content">{vaccine?.report?.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Vaccine;
