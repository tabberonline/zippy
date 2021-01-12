export const initialState = {
    user_id: null,
    user: [],
    token: null,
    login: false,
    rankWidgets: [],
    contestWidgets: [],
    projects: [],
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user_id: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_LOGIN':
            return {
                ...state,
                login: action.token
            }
        case 'SET_RANK_WIDGETS':
            return {
                ...state,
                rankWidgets: action.token
            }
        case 'SET_CONTEST_WIDGETS':
            return {
                ...state,
                contestWidgets: action.token
            }
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.token
            }
        default:
            return state;
    }
}

export default reducer;