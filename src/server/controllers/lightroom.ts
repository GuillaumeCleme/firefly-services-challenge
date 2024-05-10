import { Controller, EditOptions } from "../interfaces";
import { Request, Response } from "express";
import { editImage } from "../lightroom";

/**
 * An Express controller to access the Lightroom service.
 */
export class LightRoomController implements Controller {
    async handle(req: Request, res: Response): Promise<void> {
        try {

            const options: EditOptions = req.body;

            //Basic object validation, validating the properties against a schema would be safer
            if(!options || !options.href){
                res.status(400).send({
                    error: "The request must contain an 'href'."
                });
                return;
            }

            //Get a response and return it to the client
            const response = await editImage(options)
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