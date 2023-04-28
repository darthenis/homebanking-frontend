import axios from "axios";

export const activeEmail = async (token) => {

    setTimeout(() =>   axios.post('/api/clients/active', 'token='+token, {headers:{'content-type':'application/x-www-form-urlencoded'}})
    .then(res => {
            return true;
    })
    .catch(err => {
        return false

    }), 3000)

}