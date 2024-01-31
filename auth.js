import axios from 'axios'

export function getToken(){
    const tokenArmazenado = localStorage.getItem('x-access-token')
    return tokenArmazenado
}


export function isAuth(){
    const token = getToken()
    return !!token
}

export async function isValid(){
    const token = getToken()
    await axios.post('http://localhost:3000/verify', null, {
        headers: {
            'Cache-Control': 'no-cache',
            'x-access-token': token
        }
    })
    .then((Response) => {
        if (Response.data.success){
            return true
        }
        else if(Response.status === 401){
            localStorage.removeItem('x-access-token')
        }
    })
}