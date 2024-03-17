import axios from "axios";

export const getVaccines = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/vaccines"
  );
  return data;
};

export const deleteVaccines = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines/${id}`
  );
  return data;
};

export const createVaccines = async (vaccines) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines`,
    vaccines
  );
  return data;
};

export const updateVaccinesFunc = async (vaccines) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines`,
    vaccines
  );
  return data;
};

export const searchVaccineByAnimalName = async (name) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL
    }/v1/vaccines/search-by-animal-name/${name}`
  );
  return data;
};

export const searchUpcomingVaccination = async (protectionStartDate , protectionFinishDate ) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL
    }/v1/vaccines/upcomingVaccination?startDate=${protectionStartDate}&endDate=${protectionFinishDate}`
  );
  return data;
};
