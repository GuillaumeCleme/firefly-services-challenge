import { Slice, createSlice } from "@reduxjs/toolkit";
import { ActionListing, GeneratedImage } from "../interfaces";

interface AppState {
    actions: ActionListing[]
    actionButton: {
        isLoading: boolean;
        props: any;
    };
    generation: {
        prompt: string,
        numImages: number
        isValid: boolean
    };
    generatedImages: GeneratedImage[];
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
    generatedImages: [
        {
            href: '',
            prompt: '',
        },
        {
            href: '',
            prompt: '',
        },
        {
            href: '',
            prompt: '',
        },
        {
            href: '',
            prompt: '',
        },

    ]
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
        setGeneratedImages(state, action) {
            state.generatedImages = action.payload;
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
    }
});

export const {
    setActionButtonLoading,
    setActionButtonProps,
    setGeneratedImages,
    setGenerationPrompt,
    setGenerationNumImages,
    setGenerationIsValid,
} = appSlice.actions;

export default appSlice.reducer;