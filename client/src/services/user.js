import axios from 'axios'

export function login({email, password}) {
    return axios.post('/api/login', {email, password});
}



