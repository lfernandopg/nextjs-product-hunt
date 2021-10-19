import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

function useAuth() {
    const [ userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(firebase.auth, (user) => {
            if(user) {
                setUserAuth(user);
            } else {
                setUserAuth(null);
            }
        });
        return () => unsuscribe();
    }, []);

    return userAuth;
}

export default useAuth;