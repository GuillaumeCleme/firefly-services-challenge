import { Express } from "express";
import { IMSController } from "./controllers/ims";

const API_BASE_PATH = '/api/v1';

/**
 * Main Express router for all application routes and middleware
 * 
 * @param app Express
 */
export function useRoutes(app: Express) {

    app.get(`${API_BASE_PATH}`, function (_req, res) {
        res.status(200).send(); //TODO we should handle swagger docs
    })

    //IMS token generation
    app.post(`${API_BASE_PATH}/ims/token`, new IMSController().handle)
}