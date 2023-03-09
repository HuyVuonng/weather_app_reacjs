import axios from "axios";

const httpRequest = async(path,q)=>{
    const respone=await axios.get(path,{
        params:{
            q,
            units:'metric',
            appid:'8641075dda9ea5d5c961c48c00929bec'
        }
    })
        return respone
}
export default httpRequest