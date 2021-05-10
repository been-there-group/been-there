import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import blueMountains from '../../assets/blueMountains.png'
import './Account.scss';

const Account = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [userId, setUserId] = useState();
    const [edit, setEdit] = useState('noEdit');
    const [isUploading, setIsUploading] = useState(false);
    const [url, setUrl] = useState('http://via.placeholder.com/450x450')

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


    //aws stuff
    function getSignedRequest([file]) {
        setIsUploading(true);
        // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    
        // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
        axios
          .get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
          })
          .then(response => {
            const { signedRequest, url } = response.data;
            uploadFile(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      const uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios
          .put(signedRequest, file, options)
          .then(response => {
            setIsUploading(false, url);
            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
            setProfilePic(url)
            console.log("url=", url)
          })
          .catch(err => {
            setIsUploading(false);
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };
    

      //end of aws



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
    // function editProfilePic(e){
    //     setProfilePic(e);
    // };

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
        <div className="outermost-container">
            <Nav />
          <img className="account-background" alt="" src={blueMountains} />
            <div className="account-body">
              <div className="other-container">

                <header>Your Account</header>
                <section className={edit === "noEdit" ? "noEdit" : "edit"}>
                    <main className="username">Username: {username}</main>
                    <div className="email">Email: {email}</div>
                    <div className="profile-pic">Profile Picture: {profilePic}</div>
                    <button className="modal-button" onClick={handleClick}>Edit Account</button>
                </section>
                <section className={edit === "noEdit" ? "edit" : "noEdit"}>
                    <input className="user-input" value={username} onChange={(e) => editUsername(e.target.value)}></input>
                    <br />
                    <input className="user-input" value={email} onChange={(e) => editEmail(e.target.value)}></input>
                    <Dropzone
                        onDropAccepted={getSignedRequest}
                        accept="image/*"
                        multiple={false}>
                    {({getRootProps, getInputProps}) => (
                      <div
                      style = {{
                        position: 'relative',
                        width: 160,
                        height: 80,
                        borderWidth: 5,
                        marginTop: 25,
                        borderColor: 'gray',
                        borderStyle: 'dashed',
                        borderRadius: 5,
                        display: 'inline-block',
                        fontSize: 17,}}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
                        </div>
                    )}
                    </Dropzone>
                    <button className="modal-button" onClick={() => editUser()}>Save Changes</button>
                </section>
            </div>
        </div>
    </div>
    )
}
export default Account;