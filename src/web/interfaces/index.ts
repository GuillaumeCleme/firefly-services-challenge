import { GenerationOptions } from "../../server/interfaces"


export interface GeneratedImage {
    id: string,
    href: string,
    description?: string
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