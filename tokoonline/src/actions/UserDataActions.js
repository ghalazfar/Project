import axios from 'axios'
import { API_URL_1 } from '../supports/api-url/apiurl'

export const getUserTransaction = (iduser) => {
    return(dispatch) => {
        axios.post(API_URL_1 + '/usertransaction', {
            iduser: iduser
        }).then(res => {
            dispatch({
                type: "TRANSACTION_DATA",
                payload: {
                    onCart: res.data.onCart,
                    onProcess: res.data.onProcess,
                    delivered: res.data.delivered
                }
            })   
        })
    }
}