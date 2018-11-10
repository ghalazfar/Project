import axios from 'axios'
import { API_URL_1 } from '../supports/api-url/apiurl'

export const searchQuery = (query) => {
    return (dispatch) => {
        axios.get(API_URL_1 + '/search?q=' + query
        ).then((res) => {
            dispatch({
                type: "SEARCH_QUERY",
                payload: { 
                    productData: res.data
                }
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}