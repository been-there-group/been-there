import React, {useState} from 'react';
import axios from 'axios';

const Nav = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');

    function login(){
        axios.post('/api/login', {username, password})
            .then(res => {
                const {user_id, username} = res.data;
                //Update redux
            })
            .catch(err => {
                console.log(err)
                setErrorMsg('Incorrect username or password!')
            })
    };
        
    function register(){
        axios.post('/api/register', {username, password, email, profilePic})
            .then(res => {
                const {user_id} = res.data;
                //Update redux
            })
            .catch(err => {
                console.log(err)
                setErrorMsg('username taken')
            })
    };

    function logout(){
        axios.post('/api/logout')
            .then(res => {
                setUsername('');
                setPassword('');
                setErrorMsg('');
                setEmail('');
                setProfilePic('');
                //Update Redux

                props.history.push('/');
            })
    };

    return(
        <div>
            <div>logo</div>
            <div className='profilePic'>
                <img src={profilePic} alt='profile pic' />
            </div>
            <ul >
                <li>Sign Up</li>
                <li>Login</li>
            </ul>
            <div >
                <h1>{errorMsg} X</h1>
                <input placeholder='Username'/>
                <input placeholder='Password'/>
                <button onClick={login}>Login</button>
            </div>
            <div >
                <h1>{errorMsg} X</h1>
                <input placeholder='Username'/>
                <input placeholder='Email' />
                <input placeholder='Password'/>
                <button onClick={register}>Register</button>
            </div>
            <ul>
                <li>Your Trips</li>
                <li>Account</li>
                <li>Bucket List</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    )
}
export default Nav;