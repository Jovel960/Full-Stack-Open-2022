import axios from 'axios';

const getAll = (url) => {
   const request = axios.get(url)
   return request.then(res=>res.data)
}

const addContact = (url, person) => {
    const request = axios.post(url, person)
    return request.then(res => res.data)
}

const deleteContact = (url, id) => {
   return axios.delete(`${url}/${id}`) 
 }

 const updateContact = (url, person) => {
    const request = axios.put(`${url}/${person.id}`, person)
    return request.then(res => res.data)
 }

export default {addContact, getAll, deleteContact, updateContact};