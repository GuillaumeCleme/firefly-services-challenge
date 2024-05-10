import { Request, Response } from 'express'

export const DEFAULT_MIME_TYPE = 'image/png'; // default

export interface Controller {
    handle(req: Request, res: Response): void
}

export interface GenerationOptions {
    //Basic generation options - to be extended
    prompt: string,
    numImages: number
}

export interface EditOptions {
    href: string
    //Basic edit options - to be extended
    exposure: 0,
    saturation: 0,
    contrast: 0
}

export interface IMSTokenOptions {
    grant_type: 'client_credentials',
    client_id: string,
    client_secret: string,
    scope: string,
}