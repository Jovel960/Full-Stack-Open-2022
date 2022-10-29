import axios from 'axios';

const getAll = (url) => {
   const request = axios.get(url)
   return request.then(res=>res.data)
}

const addPerson = (url, person) => {
    const request = axios.post(url, person)
    return request.then(res => res.data)
}

export default {addPerson, getAll};