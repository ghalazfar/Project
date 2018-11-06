import axios from 'axios'
import { API_URL_1 } from '../supports/api-url/apiurl'

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