import axiosClient from "../axios.js";
import axios from "axios";
import router from "../router/index.js";

export function getCurrentUser({commit}, data) {
    return axiosClient.get('/user', data)
        .then(({data}) => {
            commit('setUser', data);
            return data;
        })
}

export function login({commit}, data) {
    return axiosClient.post('/login', data)
        .then(({data}) => {
            commit('setUser', data.user);
            return data;
        })
}

export function logout({commit}) {
    axios.post('/logout').then(data => {
        localStorage.removeItem('x-xsrf-token')
        router.push({name: 'login'})
    })
}

