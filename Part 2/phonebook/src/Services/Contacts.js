import axios from 'axios';

const getAll = (url) => {
   const request = axios.get(url)
   return request.then(res=>res.data)
}

const addPerson = (url, person) => {
    const request = axios.post(url, person)
    return request.then(res => res.data)
}

const deletePerson = (url, id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(res => res)

 }

export default {addPerson, getAll, deletePerson};