import axios from "axios";

export const getDates = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/dates"
  );
  return data;
};

export const deleteDates = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/dates/${id}`
  );
  return data;
};

export const createDates = async (dates) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/dates`,
    dates
  );
  return data;
};

export const updateDatesFunc = async (dates) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/dates`,
    dates
  );
  return data;
};
