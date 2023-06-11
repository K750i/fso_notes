import axios from 'axios'

const baseURL = '/api/notes'
let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

function getAll() {
  return axios.get(baseURL).then((response) => response.data)
}

function create(newObject) {
  const config = {
    headers: { Authorization: token },
  }

  return axios.post(baseURL, newObject, config).then((response) => response.data)
}

function update(id, newObject) {
  return axios.put(`${baseURL}/${id}`, newObject).then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken,
}
