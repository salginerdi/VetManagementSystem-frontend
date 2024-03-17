import axios from "axios";

export const getAppointments = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/appointments"
  );
  return data;
};

export const deleteAppointments = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/${id}`
  );
  return data;
};

export const createAppointments = async (appointments) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments`,
    appointments
  );
  return data;
};

export const updateAppointmentsFunc = async (appointments) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments`,
    appointments
  );
  return data;
};

export const searchDateAndDoctor = async (name, startDate, endDate) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL
    }/v1/appointments/filter/doctor?startDate=${startDate}&endDate=${endDate}&doctorName=${name}`
  );
  return data;
}

export const searchDateAndAnimal = async (name, startDate, endDate ) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL
    }/v1/appointments/filter/animal?startDate=${startDate}&endDate=${endDate}&animalName=${name}`
  );
  return data;
}
