import axios from "axios";
import FormData from "form-data"; //Only required for v16 compatibility
import { IMSTokenOptions } from "../interfaces"

/**
 * A server side function to get an access_token from the IMS service.
 * @param options IMSTokenOptions
 * @returns access_token
 */
export async function getToken(options?: IMSTokenOptions):Promise<string> {

    //Build the form data payload
    var formData = new FormData();

    formData.append('grant_type', 'client_credentials' || options?.grant_type);
    formData.append('client_id', process.env.IMS_CLIENT_ID || options?.client_id);
    formData.append('client_secret', process.env.IMS_CLIENT_SECRET || options?.client_secret);
    formData.append('scope', process.env.IMS_SCOPE || options?.scope);

    return await axios.post(process.env.IMS_ENDPOINT || 'https://ims-na1.adobelogin.com/ims/token/v3', formData, {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then((response) => {
        return response.data.access_token;
    })
   .catch((error) => {
        console.error(error);
        throw error;
    })
}