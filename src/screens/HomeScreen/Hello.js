import React, {useContext} from 'react'
import {ProgrammerContext} from '../../utility/userContext';

function Hello() {
    const [user, setUser] = useContext(ProgrammerContext);
    console.log(user);
    return (
        <div>
            <h1>{user.name}</h1>
            <button onClick={() => setUser({...user, login: true, name: 'Rahul'})} />
        </div>
    )
}

export default Hello
