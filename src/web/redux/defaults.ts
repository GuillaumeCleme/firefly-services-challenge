import { GeneratedImage } from "../interfaces";
import { v4 as uuidv4 } from 'uuid'

export const getDefaultImages = () => {
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



