import axios from "axios";
export default  function Axios(url,method,data){
    return axios({
        method: method,
        url: url,
        data: data
    }).catch(err => {
        console.log(err);
    });
}