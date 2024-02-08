import axios from 'axios'

export function getToken() {
    const token = localStorage.getItem('x-access-token')
    if (token == null) {
        return null
    }
    else {
        return token
    }
}

export async function auth() {
    const token = getToken()
    let isAuth = false
    if (token == null) {
        return false
    }
    else {
        await axios.post('http://localhost:3000/verify', null, {
            headers: {
                'x-access-token': token
            }
        })
            .then(response => {
                if (response.data.success) {
                    isAuth = true
                }
                else {
                    alert('Sessão expirada! Faça login novamente.')
                    localStorage.removeItem('x-access-token')
                    isAuth = false
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert('Sessão expirada! Faça login novamente.')
                    localStorage.removeItem('x-access-token')
                    isAuth = false
                }
            })
    }
    return isAuth
}