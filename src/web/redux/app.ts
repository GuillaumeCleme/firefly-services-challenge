import { Slice, createSlice } from "@reduxjs/toolkit";

interface AppState {
    actionButton: {
        show: boolean;
        props: any;
    };
}

const initialState: AppState = {
    actionButton: {
        show: false,
        props: {}
    },
}

const appSlice:Slice = createSlice({
    name: 'appSlice',
    initialState: initialState,
    reducers: {
        setShowActionButton (state, action) {
            state.actionButton.show = action.payload;
        },
        setActionButtonProps (state, action) {
            state.actionButton = action.payload;
        },
    }
});

export const {
    setShowActionButton,
    setActionButtonProps,
} = appSlice.actions;

export default appSlice.reducer;