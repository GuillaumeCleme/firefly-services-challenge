import axios from "axios";
import { getToken } from "../auth/ims";
import { DEFAULT_MIME_TYPE, GenerationOptions } from "../interfaces";


export async function generateImages(options: GenerationOptions): Promise<Record<string, any>> {

    //Get a new IMS token
    //TODO This token should be cached
    const token = await getToken();

    const headers = {
        'x-api-key': process.env.IMS_CLIENT_ID,
        'x-accept-mimetype': DEFAULT_MIME_TYPE,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    /*
    * Create a generic payload with certain default options
    * @see https://developer.adobe.com/firefly-services/docs/firefly-api/guides/api/image_generation/
    */
    const payload = {
        "prompt": options.prompt,
        "n": options.numImages,
        "size": {
            //Default to lower-res
            "width": 1024,
            "height": 1024
        },
        "locale": "en-US"
    }

    //Execute API call and return the payload if successful - throw an error otherwise
    return await axios.post(`${process.env.FIREFLY_API_ENDPOINT}/v2/images/generate`, payload, { headers })
        .then((response) => {
            if(response.status == 200){
                return response.data;
            }
            else{
                const error = `Response code ${response.status} received from Firefly API with message ${response.statusText}`;
                console.error(error);
                throw new Error(error);
            }
        })
        .catch((error) => {
            console.error(error);
            throw error;
        })
}