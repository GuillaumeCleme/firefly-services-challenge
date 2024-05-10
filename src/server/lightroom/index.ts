import axios, { AxiosResponse } from "axios";
import { getToken } from "../auth/ims";
import { DEFAULT_MIME_TYPE, EditOptions } from "../interfaces";


export async function editImage(options: EditOptions): Promise<Record<string, any>> {

    //Get a new IMS token
    //TODO This token should be cached
    const token = await getToken();

    const headers = {
        'x-api-key': process.env.IMS_CLIENT_ID,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    //Create a generic payload with certain default options
    const payload = {
        "inputs": {
            "source": {
                "storage": "external",
                "href": options.href
            }
        },
        "outputs": [
            {
                "storage": "external",
                "href": options.output.href,
                "type": DEFAULT_MIME_TYPE,
                "overwrite": true,
            }
        ],
        "options": {
            "Exposure": options.exposure,
            "Saturation": options.saturation,
            "Contrast": options.contrast,
        }
    }

    //Execute API call and return the payload if successful - throw an error otherwise
    return await axios.post(`${process.env.LIGHTROOM_API_ENDPOINT}/lrService/edit`, payload, { headers })
        .then(async (response) => {
            //Was the request accepted?
            if (response.status == 202) {

                //Poll job for completion until success, failure, or timeout
                const completion = await pollCompletion(response, headers);

                //Return an error if the poll timed out or the success
                if(!completion){
                    const error = `Timeout occurred while polling for job completion from LightRoom API after ${process.env.MAX_RETRIES} attempts`;
                    console.error(error);
                    throw new Error()
                }
                else{
                    return completion
                }
            }
            else {
                const error = `Response code ${response.status} received from LightRoom API with message ${response.statusText}`;
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
 * Delay processing by the specific amount of milliseconds
 * @param ms milliseconds
 * @returns Promise
 */
const delay = (ms?: number): Promise<any> => {
    return new Promise(resolve => setTimeout(resolve, ms || parseInt(process.env.DEFAULT_DELAY || "1000")));
}

/**
 * A function to poll a job until completion or timeout
 * 
 * @param response 
 * @param headers 
 * @returns pollResponse
 */
async function pollCompletion(response: AxiosResponse, headers: any) {
    try {
        //Define max retries
        for (let retry = 0; retry <= parseInt(process.env.MAX_RETRIES || "25"); retry++) {
            
            //Delay polling using a default delay
            await delay();
            
            //Get job status
            const pollResponse = await axios.get(response.data['_links'].self.href, { headers });
    
            //If the call is successful, validate the status and return the response
            if (pollResponse.status == 200) {
                if (pollResponse.data.status === "succeeded" || pollResponse.data.status === "failed") {
                    return pollResponse;
                }
            }
            else {
                const error = `Response code ${response.status} received from LightRoom API while polling job with message ${response.statusText}`;
                console.error(error);
                throw new Error(error);
            } 
        }
        
    } catch (error) {
        console.error(error);
        throw error;   
    }
}