import { Express } from "express";

const API_BASE_PATH = '/api/v1';

export function useRoutes(app: Express) {

    app.get(`${API_BASE_PATH}`, function (_req, res) {
        res.status(200).send(); //TODO we should handle swagger docs
    })
}