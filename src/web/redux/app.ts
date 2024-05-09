import { Slice, createSlice } from "@reduxjs/toolkit";
import { ActionListing, GeneratedImage } from "../interfaces";

interface AppState {
    actions: ActionListing[]
    actionButton: {
        show: boolean;
        props: any;
    };
    generationPrompt: string;
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
        show: false,
        props: {}
    },
    generationPrompt: '',
    generatedImages: [
        {
            href: '/edit',
            coverUrl: 'https://placehold.co/600x400?text=Loading',
            prompt: 'Prompt Sample',
            isLoading: true
        },
        {
            href: '/edit',
            coverUrl: 'https://placehold.co/600x400?text=Loading',
            prompt: 'Prompt Sample',
        },

    ]
}

const appSlice: Slice = createSlice({
    name: 'appSlice',
    initialState: initialState,
    reducers: {
        setShowActionButton(state, action) {
            state.actionButton.show = action.payload;
        },
        setActionButtonProps(state, action) {
            state.actionButton = action.payload;
        },
        setGeneratedImages(state, action) {
            state.generatedImages = action.payload;
        },
    }
});

export const {
    setShowActionButton,
    setActionButtonProps,
} = appSlice.actions;

export default appSlice.reducer;