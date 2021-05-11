import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {updateUser, logout} from '../../redux/userReducer';
import {useSelector} from "react-redux";
import axios from 'axios';
import bestLogo1 from '../../assets/bestLogo1.png'
import './Nav.scss';


//add profile pic to redux state so that it will update automatically
const Nav = (props) => {
    // console.log(props)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [authMenu, setAuthMenu] = useState('authClosed');
    const [loginMenu, setLoginMenu] = useState('loginClosed');
    const [registerMenu, setRegisterMenu] = useState('registerClosed');
    const [menu, setMenu] = useState('closed');

    const user = useSelector((state) => state.userReducer);
    const {user_id, profile_pic} = user;
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/api/get-me`)
        .then((res) => {
          dispatch(updateUser(res.data))
        //   console.log(res.data)
        })
        .catch(err => console.log(err));
      }, [])

    function login(){
        axios.post('/api/login', {username, password})
        .then(res => {
            const {user_id, username, profile_pic} = res.data;
            //Update redux
            // console.log(props)
            props.updateUser({username, user_id, profile_pic})
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
                // console.log('.then')
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
        // console.log(props);
        // const {user_id} = false;
        setLoginMenu('loginClosed');
        setRegisterMenu('registerClosed');
        if(!user_id){
            if(authMenu === 'authClosed'){
                setAuthMenu('authOpen');              
            } else {
                setAuthMenu('authClosed');
            };
            // console.log('clicked!')
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
        <div className="nav-body">
            <div>
                <Link to={"/"}>
                <img className="logo" alt="" src={bestLogo1}/>
                </Link>
            </div>
            <header className='siteName'>Been There</header>
            <div className='profilePicHome'>
                <img src={profile_pic
                    ? profile_pic
                    : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                } className='profilePic' alt='profile pic' onClick={handleClick} />
            </div>

            <div className={
                authMenu === 'authOpen' || 
                loginMenu === 'loginOpen' ||
                registerMenu === 'registerMenuOpen' ? 'open-2' : 'closed'}></div>

            <ul className={authMenu === 'authClosed' ? 'closed' : 'open'}>
                <button className="modal-button" onClick={registerView}>Sign Up</button>
                <button className="modal-button" onClick={loginView}>Login</button>
            </ul>

            <div className={loginMenu === 'loginClosed' ? 'closed' : 'open'}>
                <div className='register-login'>
                    {errorMsg && <h3>{errorMsg}<span onClick= {removeErrorMsg}>X</span></h3>}
                    <input className='input' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                    <input className='input' placeholder='Password' type='password' onChange={e => setPassword (e.target.value)}/>
                    <button onClick={() => login()} className='-button'>Login</button>
                </div>
            </div>

            <div className={registerMenu === 'registerClosed' ? 'closed' : 'open'}>
                <div className='register-login'>
                    {errorMsg && <h3>{errorMsg}<span onClick= {removeErrorMsg}>X</span></h3>}
                    <input className='input' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                    <input className='input' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                    <input className='input' placeholder='Password' onChange={e => setPassword (e.target.value)}/>
                    <button onClick={register} className='-button'>Register</button>
                </div>
            </div>

            <ul className={menu === 'closed' ? 'closed' : 'open'}>
                <li><Link to={`/all-trips/${user_id}`} className="nav-link">Your Trips</Link></li>
                <li><Link to={`/bucketlist/${user_id}`} className="nav-link" >Bucket List</Link></li>
                <li><Link to={`/account/${user_id}`} className="nav-link" >Your Account</Link></li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    )
}
const mapStateToProps = (reduxState) => {
    return {
      user: reduxState
  }}
  
  export default withRouter(connect(mapStateToProps, {updateUser, logout})(Nav));