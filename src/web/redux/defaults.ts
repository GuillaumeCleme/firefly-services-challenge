import { GeneratedImage } from "../interfaces";
import { v4 as uuidv4 } from 'uuid'
import { AppState } from "./app";

/**
 * A helper function to generate default images
 * @returns GeneratedImage[]
 */
const getDefaultImages = () => {
    const generatedImages: GeneratedImage[] = []
    new Array(...[1,2,3,4]).forEach(_i => {
        generatedImages.push({
            id: uuidv4(),
            href: '',
            prompt: ''
        })
    });

    return generatedImages;
}

/**
 * A helper function to setup the initial store state
 * 
 * @returns AppState
 */
export const getInitialState = (): AppState => {
    return {
        actions: [
            {
                title: 'Generate Image',
                description: 'Generate an image from a text prompt',
                href: '/generate',
                coverUrl: 'https://developer.adobe.com/firefly-services/static/ed3e4e7b5490078d2ca538b4e67a0870/96755/UseCase4_new.webp'
            }
        ],
        actionButton: {
            isLoading: false,
            props: {}
        },
        generation: {
            prompt: 'Beautiful cozy fantasy stone cottage in a spring forest aside a cobblestone path and a babbling brook. Stone wall. Mountains in the distance. Magical tone and feel, hyper realistic.',
            numImages: 4,
            isValid: true
        },
        //Default to 4 placeholder cards
        generatedImages: getDefaultImages(),
    }
}


