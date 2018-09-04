// membuat actioncreator
// menghasilkan action berupa objek
// masuk ke semua reducer

// export const onLoginSuccess = (user) => {
//     return {
//         type: "USER_LOGIN_SUCCESS",
//         payload: user
//     }
// }
import axios from 'axios'
import { API_URL_1 } from '../supports/api-url/apiurl'

export const onLogin = (user) => {
    return(dispatch) => {
        axios.get(API_URL_1 + '/users', {
            params: { // langsung ke property username dan password
                email: user.email,
                password: user.password
            }
        }).then(user => {
            dispatch({ // dispatch fungsi menggantikan return, bisa lebih dari sekali
                type: "USER_LOGIN_SUCCESS",
                payload: { 
                    username: user.data[0].username, //didestructure, cuma perlu object username dan email aja, password ga perlu
                    email: user.data[0].email,
                    error: "",
                    cookieCheck: true
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

//untuk cookies
export const keepLogin = (email) => {
    return(dispatch) => {
        axios.get(API_URL_1 + '/users', {
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
                    cookieCheck: true
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
        axios.post(API_URL_1 + '/users', user
        // isi user adalah: {
        //     username: user.username,
        //     email: user.email,
        //     password: user.password
        // }
        ).then((res) => {
            console.log(res)
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { 
                    username: res.data.username,
                    email: res.data.email
                }
            })
        }).catch((err) => {
            console.log(err)
        })
     }
}
