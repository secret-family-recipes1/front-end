import axios from 'axios'

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'https://back-end-recipes.herokuapp.com',
        headers: {Authorization: localStorage.getItem('token')}
    })
}