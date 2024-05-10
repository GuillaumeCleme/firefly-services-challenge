import { Express } from "express";
import { IMSController } from "./controllers/ims";
import { FireflyController } from "./controllers/firefly";
import { LightRoomController } from "./controllers/lightroom";
import { StorageGetController, StorageSaveController } from "./controllers/storage";

export const API_BASE_PATH = '/api/v1';

export let LOCAL_URL = 'http://localhost:3000';
export let PUBLIC_URL = 'http://localhost:3000';

export const setPublicUrl = (url: string) => {
    PUBLIC_URL = url;
}

export const setLocalUrl = (url: string) => {
    LOCAL_URL = url;
}

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

    //Firefly image generation
    app.post(`${API_BASE_PATH}/firefly/generate`, new FireflyController().handle)

    //Lightroom image editing
    app.post(`${API_BASE_PATH}/lightroom/edit`, new LightRoomController().handle)

    //Storage Controllers
    app.put(`${API_BASE_PATH}/storage/save`, new StorageSaveController().handle)
    app.get(`${API_BASE_PATH}/storage/get`, new StorageGetController().handle)
}