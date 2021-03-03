import React, {useState, createContext} from 'react';

export const ProgrammerContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({
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
        resumeLink: '',
    });
    return(
        <ProgrammerContext.Provider value={[user, setUser]}>
            {props.children}
        </ProgrammerContext.Provider>
    );
}