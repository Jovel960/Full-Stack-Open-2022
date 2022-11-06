import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
   const request = axios.get(baseUrl)
   return request.then(res=>res.data)
}

const addContact = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(res => res.data)
}

const deleteContact = (id) => {
   return axios.delete(`${baseUrl}/${id}`) 
 }

 const updateContact = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(res => res.data)
 }

export default {addContact, getAll, deleteContact, updateContact};