import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import './Account.scss';

const Account = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [userId, setUserId] = useState();
    const [edit, setEdit] = useState('noEdit');

    useEffect(() => {
        axios.get('/api/get-me')
            .then((res) => {
                const {user_id, username, email, profile_pic} = res.data;
                setUsername(username);
                setEmail(email);
                setProfilePic(profile_pic);
                setUserId(user_id);
            })
    }, [userId]);

    function handleClick(){
        if(edit === 'noEdit'){
            setEdit('edit')
        } else{
            setEdit('noEdit')
        }
    };
    function editUsername(e){
        setUsername(e);
    };
    function editEmail(e){
        setEmail(e);
    };
    function editProfilePic(e){
        setProfilePic(e);
    };

    function editUser(){
        console.log('saveEdit');
        axios.put('/api/edit', {username, email, profilePic})
            .then(result => {
                console.log(result)
                handleClick();
            })
            .catch(error => console.log(error))
    }

    return(
        <div>
            <Nav />
            <body>
                <header>Your Account</header>
                <section className={edit === "noEdit" ? "noEdit" : "edit"}>
                    <main>Username: {username}</main>
                    <div>Email: {email}</div>
                    <div>Profile Picture: {profilePic}</div>
                    <button onClick={handleClick}>Edit Account</button>
                </section>
                <section className={edit === "noEdit" ? "edit" : "noEdit"}>
                    <input value={username} onChange={(e) => editUsername(e.target.value)}></input>
                    <input value={email} onChange={(e) => editEmail(e.target.value)}></input>
                    <input value={profilePic} onChange={(e) => editProfilePic(e.target.value)}></input>
                    <button onClick={editUser}>Save Changes</button>
                </section>
            </body>
        </div>
    )
}
export default Account;