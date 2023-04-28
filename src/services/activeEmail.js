import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const activeEmail = async (token) => {

    setTimeout(() =>   axios.post('/api/clients/active', 'token='+token, {headers:{'content-type':'application/x-www-form-urlencoded'}})
    .then(res => {
            return true;
    })
    .catch(err => {
        return false

    }), 3000)

}

export const resendEmail = async (email) => axios.post("/api/clients/resend", `email=${email}`, {headers:{'content-type':'application/x-www-form-urlencoded'}})
                .then(res => {
                    
                    return true
                
                })
                .catch(err => {
                            if(err.response.data == "User already active"){
                                
                                toast("The account is already active",{
                                        toastStyle: {
                                            fontSize: '20px',
                                            background: "#9b1d1d",
                                            color: "white"
                                        }
                                    }
                                );

                                return "already active"

                            }
                            return false
                    })