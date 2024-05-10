import { Controller, DEFAULT_MIME_TYPE } from "../interfaces";
import { Request, Response } from "express";
import { getLocal, saveLocal } from "../storage/local";

/**
 * An Express controller to access the Storage save service.
 */
export class StorageSaveController implements Controller {
    async handle(req: Request, res: Response): Promise<void> {
        try {

            //Basic object validation, validating the properties against a schema would be safer
            if (!req.body) {
                res.status(400).send({
                    error: "The request must contain a binary body."
                });
                return;
            }

            //File name validation
            if (!req.query.fileName) {
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

/**
 * An Express controller to access the Storage get service.
 */
export class StorageGetController implements Controller {
    async handle(req: Request, res: Response): Promise<void> {
        try {

            //File name validation
            if (!req.query.fileName) {
                res.status(400).send({
                    error: "The request must contain a 'fileName' query string."
                });
                return;
            }

            //Get file stream and respond
            res.status(200)
                .appendHeader('Content-Type', DEFAULT_MIME_TYPE)
                .send(
                    await getLocal(req.query.fileName as string)
                );
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                error: (error as Error).message
            });
        }
    }
}