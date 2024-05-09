import { Slice, createSlice } from "@reduxjs/toolkit";
import { ActionListing, GeneratedImage, UIGenerationOptions } from "../interfaces";
import { v4 as uuidv4 } from 'uuid'

export interface AppState {
    actions: ActionListing[]
    actionButton: {
        isLoading: boolean;
        props: any;
    };
    generation: UIGenerationOptions;
    generatedImages: GeneratedImage[];
}

const initiateDefaultImages = (numImages: number, isLoading?: boolean, defaultCoverUrl? : string) => {
    const generatedImages: GeneratedImage[] = []
    Array.from(Array(numImages).keys()).forEach(_i => {
        generatedImages.push({
            id: uuidv4(),
            href: '',
            prompt: '',
            isLoading: isLoading ?? false, //Images are not loading by default
            coverUrl: defaultCoverUrl
        })
    });

    return generatedImages;
}

const initialState: AppState = {
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
    generatedImages: initiateDefaultImages(4, false),
}

const appSlice: Slice = createSlice({
    name: 'appSlice',
    initialState: initialState,
    reducers: {
        setActionButtonLoading(state, action) {
            state.actionButton.isLoading = action.payload;
        },
        setActionButtonProps(state, action) {
            state.actionButton = action.payload;
        },
        setGenerationPrompt(state, action) {
            state.generation.prompt = action.payload;
        },
        setGenerationNumImages(state, action) {
            state.generation.numImages = action.payload;
        },
        setGenerationIsValid(state, action) {
            state.generation.isValid = action.payload;
        },
        initiateImages(state, action) {
            const { numImages, isLoading } = action.payload;
            state.generatedImages = [...initiateDefaultImages(numImages, isLoading)]; //Initiate images with an initial size
        },
        updateImage(state, action) {
            const { index, image } = action.payload; //Using index, but id would be preffered
            state.generatedImages[index] = {...image}; //Spread image properties
        },
    }
});

export const {
    setActionButtonLoading,
    setActionButtonProps,
    setGeneratedImages,
    setGenerationPrompt,
    setGenerationNumImages,
    setGenerationIsValid,
    initiateImages,
    updateImage
} = appSlice.actions;

export default appSlice.reducer;