import { Controller } from "../interfaces";
import { Request, Response } from "express";
import { saveLocal } from "../storage/local";

/**
 * An Express controller to access the Storage service.
 */
export class StorageController implements Controller {
    async handle(req: Request, res: Response): Promise<void> {
        try {

            //Basic object validation, validating the properties against a schema would be safer
            if(!req.body){
                res.status(400).send({
                    error: "The request must contain a binary body."
                });
                return;
            }

            //File name validation
            if(!req.query.fileName){
                res.status(400).send({
                    error: "The request must contain a 'fileName' query string."
                });
                return;
            }

            //Get a response and return a success
            await saveLocal(req.query.fileName as string, req.body)
            res.status(200).send();
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                error: (error as Error).message
            });
        }
    }
}