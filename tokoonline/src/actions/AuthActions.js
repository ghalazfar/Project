import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { getUserTransaction } from './UserDataActions';

export const onLogin = (user) => {
    return(dispatch) => {
        axios.post(API_URL_1 + '/login', {
            params: {
                email: user.email,
                password: user.password
            }
        }).then(user => {
            console.log(user)
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: {
                    iduser: user.data[0].iduser,
                    username: user.data[0].username,
                    email: user.data[0].email,
                    status: user.data[0].status,
                    error: "",
                    cookiesChecked: true
                }
            })
            dispatch(getUserTransaction(user.data[0].iduser))
        }).catch(err => {
            console.log(err)
            dispatch({
                type: "USER_LOGIN_FAIL"
            })
        })
    }
}

export const keepLogin = (email) => {
    return(dispatch) => {
        axios.post(API_URL_1 + '/keeplogin', {
            params: {
                email: email
            }
        }).then(user => {
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: {
                    iduser: user.data[0].iduser, 
                    username: user.data[0].username,
                    email: user.data[0].email,
                    status: user.data[0].status,
                    error: "",
                    cookiesChecked: true
                }
            })
            dispatch(getUserTransaction(user.data[0].iduser))      
        }).catch(err => {
            console.log(err)
            dispatch({
                type: "USER_LOGIN_FAIL"
            })
        })
    }
}

export const onLogout = () => {
    return {
        type: "USER_LOGOUT"
    }
}

export const cookiesChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    }
}

export const onRegister = (user) => {
    return (dispatch) => {
        axios.post(API_URL_1 + '/register', user
        ).then((res) => {
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: {
                    iduser: res.data.iduser, 
                    username: res.data.username,
                    email: res.data.email,
                    status: res.data.status,
                    error: "",
                    cookiesChecked: true
                }
            })
            dispatch({
                type: "COOKIES_CHECKED"
            })
        }).catch((err) => {
            console.log(err)
        })
     }
}