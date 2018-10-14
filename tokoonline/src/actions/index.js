import axios from 'axios'
import { API_URL_1 } from '../supports/api-url/apiurl'

export const onLogin = (user) => {
    return(dispatch) => {
        axios.post(API_URL_1 + '/login', {
            params: {
                email: user.email,
                password: user.password
            }
        }).then(user => {
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { 
                    username: user.data[0].username,
                    email: user.data[0].email,
                    error: "",
                    cookiesChecked: true
                }
            })      
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
                    username: user.data[0].username,
                    email: user.data[0].email,
                    error: "",
                    cookiesChecked: true
                }
            })      
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
                    username: res.data.username,
                    email: res.data.email,
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

export const categorySelect = (category) => {
    var APIURL = ''
    if (category[1] == undefined){
        APIURL = API_URL_1 + '/productlist?cat=' + category[0]
    }
    else {
        APIURL = API_URL_1 + '/productlist?cat=' + category[0] + '&catdetail=' + category[1]
    }
    return (dispatch) => {
        axios.get(APIURL
        ).then((res) => {
            dispatch({
                type: "CATEGORY_SELECT",
                payload: { 
                    selectedCategory: category,
                    productData: res.data
                }
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}