import { Slice, createSlice } from "@reduxjs/toolkit";
import { ActionListing, GeneratedImage, UIGenerationOptions } from "../interfaces";
import { getInitialState } from "./defaults";

export interface AppState {
    actions: ActionListing[]
    actionButton: {
        isLoading: boolean;
        props: any;
    };
    generation: UIGenerationOptions;
    generatedImages: GeneratedImage[];
}

const appSlice: Slice = createSlice({
    name: 'appSlice',
    initialState: getInitialState(),
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