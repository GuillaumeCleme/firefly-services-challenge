import { Request, Response } from 'express'

export interface Controller {
    handle(req: Request, res: Response): void
}

export interface GenerationOptions {
    //Basic generation options - to be extended
    prompt: string,
    numImages: number
}

export interface IMSTokenOptions {
    grant_type: 'client_credentials',
    client_id: string,
    client_secret: string,
    scope: string,
}