export const initialState = {
    user_id: null,
    token: null,
    login: false,
    rankWidgets: [],
    contestWidgets: [],
    projects: [],
    name: '',
    image: '',
    portfolio: false,
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USERID':
            return {
                ...state,
                user_id: action.user
            }
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SET_IMAGE':
            return {
                ...state,
                image: action.image
            }
        case 'SET_PORTFOLIO':
            return {
                ...state,
                portfolio: action.portfolio
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_LOGIN':
            return {
                ...state,
                login: action.login
            }
        case 'SET_RANK_WIDGETS':
            return {
                ...state,
                rankWidgets: action.rankWidgets
            }
        case 'SET_CONTEST_WIDGETS':
            return {
                ...state,
                contestWidgets: action.contestWidgets
            }
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.projects
            }
        default:
            return state;
    }
}

export default reducer;