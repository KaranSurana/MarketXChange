import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/authService';
import TokenRefill from '../components/TokenRefill';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getProfile();
            setProfile(data);
        };
        fetchProfile();
    }, []);

    const handleTokensRefilled = (newTokenAmount) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            tokens: newTokenAmount,
        }));
    };

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Tokens: {profile.tokens}</p>
            <TokenRefill onTokensRefilled={handleTokensRefilled} />
        </div>
    );
};

export default ProfilePage;
