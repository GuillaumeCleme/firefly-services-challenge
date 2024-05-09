import { GenerationOptions } from "../../server/interfaces"


export interface GeneratedImage {
    href: string,
    coverUrl?: string,
    prompt: string,
    isLoading?: boolean
}


export interface ActionListing {
    title: string,
    description: string,
    href: string,
    coverUrl: string
}

export interface UIGenerationOptions extends GenerationOptions {
        isValid: boolean
}