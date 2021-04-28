import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Nav.scss';

const Nav = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [authMenu, setAuthMenu] = useState('authClosed');
    const [loginMenu, setLoginMenu] = useState('loginClosed');
    const [registerMenu, setRegisterMenu] = useState('registerClosed');
    const [menu, setMenu] = useState('closed');

    const {user_id} = false;
    function login(){
        axios.post('/api/login', {username, password})
            .then(res => {
                const {user_id, username} = res.data;
                //Update redux
                props.updateUser({username, user_id})
                console.log(props)
                setLoginMenu('loginClosed')
            })
            .catch(err => {
                console.log(err)
                setErrorMsg('Incorrect username or password!')
            })
    };
        
    function register(){
        const profilePic = `https://robohash.org/${username}.png`;
        axios.post('/api/register', {username, password, email, profilePic})
            .then(res => {
                const {user_id} = res.data;
                //Update redux
                props.updateUser({username, user_id})
                setRegisterMenu('registerClosed')
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
                //Update Redux
                props.logout()
                props.history.push('/');
                handleClick();
            })
    };

    function handleClick(){
        setLoginMenu('loginClosed');
        setRegisterMenu('registerClosed');
        if(!user_id){
            if(authMenu === 'authClosed'){
                setAuthMenu('authOpen');              
            } else {
                setAuthMenu('authClosed');
            };
            console.log('clicked!')
        } else {
            if(menu === 'closed'){
                setMenu('open');
            } else {
                setMenu('closed');
            };
        };
    };

    function registerView(){
        setAuthMenu('authClosed');
        setMenu('closed');
        if(registerMenu === 'registerClosed'){
            setRegisterMenu('registerOpen');
        }
    };

    function loginView(){
        setAuthMenu('authClosed');
        setMenu('closed');
        if(loginMenu === 'loginClosed'){
            setLoginMenu('loginOpen')
        }
    };

    function removeErrorMsg(){
        setUsername('')
        setPassword('')
        setErrorMsg('')
      };

    return(
        <div>
            <div>logo</div>
            <div className='profilePic'>
                <img src={`https://robohash.org/${username}.png`} alt='profile pic' onClick={handleClick} />
            </div>

            <ul className={authMenu === 'authClosed' ? 'closed' : 'open'}>
                <li onClick={registerView}>Sign Up</li>
                <li onClick={loginView}>Login</li>
            </ul>

            <div className={loginMenu === 'loginClosed' ? 'closed' : 'open'}>
                {errorMsg && <h3>{errorMsg}<span onClick= {removeErrorMsg}>X</span></h3>}
                <input placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <input placeholder='Password' type='password' onChange={e => setPassword (e.target.value)}/>
                <button onClick={login}>Login</button>
            </div>

            <div className={registerMenu === 'registerClosed' ? 'closed' : 'open'}>
                {errorMsg && <h3>{errorMsg}<span onClick= {removeErrorMsg}>X</span></h3>}
                <input placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <input placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <input placeholder='Password' onChange={e => setPassword (e.target.value)}/>
                <button onClick={register}>Register</button>
            </div>

            <ul className={menu === 'closed' ? 'closed' : 'open'}>
                <Link to={`/all-trips/${user_id}`} ><li>Your Trips</li></Link>
                <Link><li>Account</li></Link> 
                <Link><li>Bucket List</li></Link>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    )
}
export default Nav;