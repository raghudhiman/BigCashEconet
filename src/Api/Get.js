import axios from "axios";
const Get=async(url)=>{

let sendResponse;

    await axios.get(url)
    .then(
        (response)=>{
            // console.log(response.data);
            sendResponse=response.data;
        },
        (error)=>{
            // console.log(error.message);
            sendResponse=error.message;
        }
    )
        return sendResponse;
}
export default Get;