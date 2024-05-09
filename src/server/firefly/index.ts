import axios from "axios";
import { getToken } from "../auth/ims";
import { GenerationOptions } from "../interfaces";


export async function generateImages(options: GenerationOptions): Promise<string> {


    let mimetype = 'image/png'; // default

    const token = await getToken();

    const headers = {
        'x-api-key': process.env.IMS_CLIENT_ID,
        'x-accept-mimetype': mimetype,
        'Authorization': `Bearer ${token}`
    };

    const payload = {
        //TODO
    }


    return await axios.post(`${process.env.FIREFLY_API_ENDPOINT}`, payload, { headers })
        .then((response) => {
            return response.data.access_token;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        })
}