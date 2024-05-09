import axios from "axios";
import FormData from "form-data"; //Only required for v16 compatibility

/**
 * A server side function to get an access_token from the IMS service.
 * 
 * @returns access_token
 */
export async function getToken():Promise<string> {

    //Build the form data payload
    var formData = new FormData();

    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', process.env.IMS_CLIENT_ID || '');
    formData.append('client_secret', process.env.IMS_CLIENT_SECRET || '');
    formData.append('scope', process.env.IMS_SCOPE || '');

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