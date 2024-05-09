import { Controller } from "../interfaces";
import { Request, Response } from "express";
import { getToken } from "../auth/ims";

/**
 * An Express controller to access the IMS service.
 * 
 * @returns access_token
 */
export class IMSController implements Controller {
    async handle(_req: Request, res: Response): Promise<void> {
        try {
            const token = await getToken();

            res.status(200).send({
                access_token: token,
                clientId: process.env.IMS_CLIENT_ID,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                error: (error as Error).message
            });
        }
    }
}