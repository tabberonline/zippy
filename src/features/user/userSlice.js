import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    login: false,
    accessToken: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logUser: (state, action) => {
            state.login = true;
            state.accessToken = action.payload.access_token;
        },
        logOutUser: (state, action) => {
            state.login = false;
            state.accessToken = null;
        },
    },
});

export const {logUser, logOutUser} = blogSuserSlicelice.actions;

export const userLogin = state => state.user.login;
export const userToken = state => state.user.accessToken;

export default userSlice.reducer;