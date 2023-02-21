import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
});

api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: localStorage.getItem("UserAdmin")
        ? "Bearer " + JSON.parse(localStorage.getItem("UserAdmin"))
        : "",
    };

    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

const apiFront = axios.create({
  baseURL: "http://localhost:8080/api/",
});

apiFront.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: localStorage.getItem("User")
        ? "Bearer " + JSON.parse(localStorage.getItem("User"))
        : "",
    };

    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

export { api, apiFront };
