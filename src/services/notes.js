import axios from "axios";

const baseURL = '/api/notes';

function getAll() {
  return axios
    .get(baseURL)
    .then(response => response.data);
}

function create(newObject) {
  return axios
    .post(baseURL, newObject)
    .then(response => response.data);
}

function update(id, newObject) {
  return axios
    .put(`${baseURL}/${id}`, newObject)
    .then(response => response.data);
}

export default {
  getAll,
  create,
  update,
};