export const initialState = {
    login: false,
    token: null,
    user_id: null,
    name: '',
    email: '',
    image: '',
    resume_present: false,
    portfolio: [],
    rank_widgets: [],
    contest_widgets: [],
    personal_projects: [],
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_LOGIN':
            return {
                ...state,
                login: action.login
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_USERID':
            return {
                ...state,
                user_id: action.user_id
            }
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.email
            }
        case 'SET_IMAGE':
            return {
                ...state,
                image: action.image
            }
        case 'SET_RESUME':
            return {
                ...state,
                resume_present: action.resume_present
            }
        case 'SET_PORTFOLIO':
            return {
                ...state,
                portfolio: action.portfolio
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
        case 'SET_PERSONAL_PROJECTS':
            return {
                ...state,
                personal_projects: action.personal_projects
            }
        default:
            return state;
    }
}

export default reducer;