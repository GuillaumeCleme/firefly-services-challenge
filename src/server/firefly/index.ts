import axios from "axios";
import { getToken } from "../auth/ims";
import { DEFAULT_MIME_TYPE, GenerationOptions } from "../interfaces";
import { saveLocal } from "../storage/local";
import { v4 as uuidv4 } from 'uuid'
import { API_BASE_PATH, LOCAL_URL } from "../routes";

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
        .then(async (response) => {
            if(response.status == 200){
                return fetchResultsLocally(response.data);
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

/**
 * Iterate through results to fetch results locally and update the presigned URLs
 * 
 * @param data 
 * @returns data
 */
export const fetchResultsLocally = async (data: {outputs: { seed: string, image: { id: string, presignedUrl: string } }[]}) => {

    //A trusty for loop to replace the presigned URLs
    for (let index = 0; index < data.outputs.length; index++) {
        //Download the image first
        const fileName = await downloadImage(data.outputs[index].image.presignedUrl);

        //Replace the preSignedUrl
        data.outputs[index].image.presignedUrl = `${LOCAL_URL + API_BASE_PATH}/storage/get?fileName=${fileName}`
    }

    return data;
}

/**
 * Download a file from its URL and save to storage
 * @param href url
 * @returns fileName
 */
export const downloadImage = async (href: string) => {
    return await axios.get(href, {responseType: 'stream'}).then(async (response) => {
        const fileName = `${uuidv4()}.png`;
        await saveLocal(fileName, response.data);
        return fileName;
    })
}