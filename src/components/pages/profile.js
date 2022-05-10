import React, {useState, useEffect} from 'react';
import '../../App.css';
import './profile.css';
import profilePlaceHolder from '../images/profilePlaceHolder.jpg';
import ProfilePane from './ProfilePane.js';


export default function Profile({userID}) {

    const [profileName, setProfileName] = useState('');
    const [aboutMe, setAboutMe] = useState('');


    async function onSubmit(e) {
        e.preventDefault();
        const profileSave = { userID: userID.uid,
                                    profileName: profileName,
                                    aboutMe: aboutMe};

        await fetch("http://localhost:5000/api/saveProfile", {
            method: "POST",
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
               },
            body: JSON.stringify(profileSave),
        })
        .catch(error => {
             console.log(error);
            return;
        });

    }
    useEffect(()=> {
        const getProfileInfo = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/getProfile/"+(userID.uid));
                if(!res.ok) throw Error("Failed to get data.");
                const info = await res.json();
                console.log(info.toString)
                setProfileName(info.profileName || "");
                setAboutMe(info.aboutMe || "");
            } catch(err) {
                console.log(err);
            }
        }
        setTimeout(()=> getProfileInfo(), 10);
    }, [userID]);

    return <div class="profile">
        <ProfilePane 
            pN = {[profileName,setProfileName]}
            aM = {[aboutMe, setAboutMe]}
        />
        <button onClick={onSubmit}>SAVE</button>     
    </div>
}