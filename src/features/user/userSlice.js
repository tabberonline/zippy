import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    login: false,
    accessToken: null,
    user_id: null,
    name: '',
    email: '',
    image: '',
    college: '',
    resume_present: false,
    portfolio: [],
    rank_widgets: [],
    contest_widgets: [],
    project_widgets: [],
    sent_history: [],
    total_mails_sent: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logUser: (state, action) => {
            state.login = true;
            state.accessToken = action.payload.access_token;
            return state;
        },
        logOutUser: (state, action) => {
            state.login = false;
            state.accessToken = null;
            state.user_id = null;
            state.name = '';
            state.email = '';
            state.image = '';
            state.college = '';
            state.resume_present = false;
            state.portfolio = [];
            state.rank_widgets = [];
            state.contest_widgets = [];
            state.project_widgets = [];
            state.sent_history = [];
            state.total_mails_sent = '';
        },
        setUser: (state, action) => {
            state.user_id = action.payload.user_id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.image = action.payload.picture_url;
            state.resume_present = action.payload.resume_present;
            state.portfolio = action.payload.portfolio;
            state.rank_widgets = action.payload.rank_widgets;
            state.contest_widgets = action.payload.contest_widgets;
            state.project_widgets = action.payload.personal_projects;
        },
        setPortfolio: (state, action) => {
            state.portfolio = action.payload.portfolio;
        },
        setRankWidgets: (state, action) => {
            state.rank_widgets = action.payload.rank_widgets;
        },
        setContestWidgets: (state, action) => {
            state.contest_widgets = action.payload.contest_widgets;
        },
        setProjectWidgets: (state, action) => {
            state.project_widgets = action.payload.personal_projects;
        },
        setHistory : (state, action) => {
            state.sent_history = action.payload.mail_history;
            state.total_mails_sent = action.payload.total_items;
        }
    },
});

export const {logUser, logOutUser, setUser, setPortfolio, setRankWidgets, setContestWidgets, setProjectWidgets, setHistory} = userSlice.actions;

export const userLogin = state => state.user.login;
export const userToken = state => state.user.accessToken;
export const userName = state => state.user.name;
export const userEmail = state => state.user.email;
export const userImage = state => state.user.image;
export const userID = state => state.user.user_id;
export const userCollege = state => state.user.college;
export const userResume = state => state.user.resume_present;
export const userPortfolio = state => state.user.portfolio;
export const userRankWidgets = state => state.user.rank_widgets;
export const userContestWidgets = state => state.user.contest_widgets;
export const userProjectWidgets = state => state.user.project_widgets;
export const userHistory = state => state.user.sent_history;
export const userMailSent = state => state.user.total_mails_sent;

export default userSlice.reducer;