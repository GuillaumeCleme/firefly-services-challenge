import { generateImages } from "../firefly";
import { Controller, GenerationOptions } from "../interfaces";
import { Request, Response } from "express";

/**
 * An Express controller to access the Firefly service.
 */
export class FireflyController implements Controller {
    async handle(req: Request, res: Response): Promise<void> {
        try {

            const options: GenerationOptions = req.body;

            //Basic object validation, validating the properties against a schema would be safer
            if(!options || !options.prompt || !options.numImages){
                res.status(400).send({
                    error: "The request must contain a 'prompt' and 'numImages'."
                });
                return;
            }

            //Get a response and return it to the client
            const response = await generateImages(options);
            res.status(200).send(response);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                error: (error as Error).message
            });
        }
    }
}