import { Controller } from "../interfaces";
import { Request, Response } from "express";
import { getToken } from "../auth/ims";

/**
 * An Express controller to access the IMS service.
 */
export class IMSController implements Controller {
    async handle(_req: Request, res: Response): Promise<void> {
        try {
            const token = await getToken();

            res.status(200).send({
                token,
                clientId: process.env.IMS_CLIENT_ID,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send((error as Error).message);
        }
    }
}